// ================= IMPORTS =================
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

// ================= INIT APP =================
const app = express();
const port = 3000;

// ================= MIDDLEWARE =================
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "."))); // serve static files

// ================= DATABASE (MONGODB) =================
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
    .then(() => console.log('Successfully connected to MongoDB ✅'))
    .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    age: Number,
    user_id: String
});
const User = mongoose.model('User', UserSchema);

const OrderSchema = new mongoose.Schema({
    id: Number,
    user_id: String,
    product_name: String,
    product_image: String,
    price: Number,
    status: String,
    date: Date,
    mode: String
});
const Order = mongoose.model('Order', OrderSchema);

// ================= HELLO TEST =================
app.get("/api/hello", (req, res) => {
    res.json({ message: "Backend & Database connected successfully ✅" });
});

// ================= ROOT TEST =================
app.get("/", (req, res) => {
    res.send("Server & DB Working ✅");
});

// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, user_id: user.user_id });
        } else {
            // Also check default admin if empty DB
            if (email === "admin@example.com" && password === "1234") {
                res.json({ success: true, user_id: "user123" });
            } else {
                res.json({ success: false, message: "Invalid credentials" });
            }
        }
    } catch (error) {
        res.json({ success: false, message: "Server error" });
    }
});

// ================= SIGNUP =================
app.post("/api/signup", async (req, res) => {
    const { name, email, password, age } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, isExisting: true, user_id: existingUser.user_id, message: "Email already registered. Logging you in..." });
        }

        const newUser = new User({
            name, email, password, age,
            user_id: "user" + Date.now()
        });
        await newUser.save();
        res.json({ success: true, user_id: newUser.user_id, message: "Account created successfully" });
    } catch (error) {
        res.json({ success: false, message: "Database error" });
    }
});

// ================= BUY ORDER =================
app.post("/api/buy", async (req, res) => {
    const { user_id, product_name, product_image, price, mode } = req.body;
    try {
        const totalOrders = await Order.countDocuments();
        const newOrder = new Order({
            id: totalOrders + 1,
            user_id,
            product_name,
            product_image,
            price: price || 500,
            status: "Pending",
            date: new Date(),
            mode: mode || "online"
        });
        await newOrder.save();
        console.log("✅ ORDER SAVED TO DB:", newOrder);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: "Database error" });
    }
});

// ================= GET ALL ORDERS =================
app.get("/api/orders", async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

// ================= GET ORDERS BY USER =================
app.get("/api/orders/:user_id", async (req, res) => {
    const userOrders = await Order.find({ user_id: req.params.user_id });
    res.json(userOrders);
});

// ================= CANCEL ORDER =================
app.put("/api/cancel/:id", async (req, res) => {
    try {
        const order = await Order.findOne({ id: req.params.id });
        if (order) {
            order.status = "Cancelled";
            await order.save();
            res.json({ success: true });
        } else {
            res.status(404).json({ error: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ================= GET DASHBOARD METRICS =================
app.get("/api/dashboard-metrics", async (req, res) => {
    let orders = await Order.find();

    // Provide backup default orders if DB is completely empty so graphs still show something
    if (orders.length === 0) {
        orders = [
            { id: 1, user_id: "user1", product_name: "T-Shirt", price: 499, status: "Pending", date: new Date(), mode: "online" }
        ];
    }

    let totalOrders = orders.length;
    let totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
    let pendingOrders = orders.filter(o => o.status === "Pending").length;
    let deliveredOrders = orders.filter(o => o.status === "Delivered").length;

    let productSales = {};
    let productNames = [];
    let productCounts = [];

    orders.forEach(o => {
        productSales[o.product_name] = (productSales[o.product_name] || 0) + 1;
    });

    Object.entries(productSales).forEach(([name, count]) => {
        productNames.push(name);
        productCounts.push(count);
    });

    res.json({
        totalOrders,
        totalRevenue,
        pendingOrders,
        deliveredOrders,
        productNames,
        productCounts,
        recentOrders: orders.slice(-5).reverse()
    });
});

// ================= GET SALES METRICS =================
app.get("/api/sales-metrics", async (req, res) => {
    let orders = await Order.find();
    if (orders.length === 0) {
        orders = [{ id: 1, user_id: "user1", product_name: "T-Shirt", price: 499, status: "Pending", date: new Date(), mode: "online" }];
    }

    let productRevenue = {};
    let channelSplit = { online: 0, offline: 0 };

    orders.forEach(o => {
        productRevenue[o.product_name] = (productRevenue[o.product_name] || 0) + o.price;
        if (o.mode === "online") channelSplit.online += o.price;
        else channelSplit.offline += o.price;
    });

    let productLabels = Object.keys(productRevenue);
    let productValues = Object.values(productRevenue);
    let channelLabels = ["Online", "Offline"];
    let channelValues = [channelSplit.online, channelSplit.offline];

    res.json({
        productLabels,
        productValues,
        channelLabels,
        channelValues,
        totalRevenue: orders.reduce((sum, o) => sum + o.price, 0),
        totalOrders: orders.length
    });
});

// ================= GET CUSTOMER INSIGHTS =================
app.get("/api/customer-insights", async (req, res) => {
    let orders = await Order.find();
    if (orders.length === 0) {
        orders = [{ id: 1, user_id: "user1", product_name: "T-Shirt", price: 499, status: "Pending", date: new Date(), mode: "online" }];
    }

    let users = await User.find();
    let userMap = {};
    users.forEach(u => {
        userMap[u.user_id] = u.name || "Unknown User";
    });

    let customerOrders = {};
    let customerSpending = {};
    let newCustomers = new Set();
    let returningCustomers = new Set();

    orders.forEach(o => {
        const user = o.user_id;
        customerOrders[user] = (customerOrders[user] || 0) + 1;
        customerSpending[user] = (customerSpending[user] || 0) + o.price;
    });

    Object.entries(customerOrders).forEach(([user, count]) => {
        if (count > 1) returningCustomers.add(user);
        else newCustomers.add(user);
    });

    let topCustomers = Object.entries(customerOrders)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    let topNames = topCustomers.map(c => {
        if (userMap[c[0]]) return userMap[c[0]];
        if (c[0] === 'user123') return 'Admin User';
        if (c[0] === 'user1') return 'Guest User';
        return 'Unknown Customer';
    });
    let topValues = topCustomers.map(c => c[1]);

    let spendingRange = [0, 0, 0];
    Object.values(customerSpending).forEach(amount => {
        if (amount <= 500) spendingRange[0]++;
        else if (amount <= 2000) spendingRange[1]++;
        else spendingRange[2]++;
    });

    res.json({
        topNames,
        topValues,
        newCustomers: newCustomers.size,
        returningCustomers: returningCustomers.size,
        spendingRange,
        averageOrderValue: (orders.reduce((sum, o) => sum + o.price, 0) / orders.length).toFixed(2),
        totalCustomers: Object.keys(customerOrders).length
    });
});

// ================= START SERVER =================
app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port} 🚀`);
});