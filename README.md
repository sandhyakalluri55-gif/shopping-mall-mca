# 🛒 Professional E-Commerce Dashboard

A full-featured e-commerce platform with real-time analytics, order management, and professional dashboards similar to Amazon/Flipkart.

## 📋 Features

### 1. **Home Page** (index.html)
- Beautiful hero section with call-to-action
- Connects to backend for verification
- Smooth navigation to registration

### 2. **Authentication** 
- **Login Page** (login.html) - Glass-style design with login/signup toggle
- **Register Page** (register.html) - Beautiful registration form with Firebase
- **Test Credentials:**
  - Email: `admin@example.com`
  - Password: `1234`

### 3. **Main Menu** (menu.html)
- Dashboard with card-based navigation
- Logout functionality
- Quick access to all sections

### 4. **Product Catalog** (product.html)
- ✅ **NEW**: Success message popup when order is placed
- Filter by category (All, Men, Women)
- Beautiful product cards with ratings
- Real-time "Successfully Order Placed" notification
- One-click checkout

### 5. **My Orders** (order.html) - Professional Amazon-Like Design
- 📦 **Real-time order tracking**
- Order statistics (Total, Spent, Pending, Delivered)
- Filter orders by status
- Professional order cards with:
  - Product images
  - Prices (₹ format)
  - Delivery information
  - Status badges (Pending, Delivered, Cancelled)
  - Track Order & Cancel buttons
- Responsive design for mobile
- Auto-refreshes every 10 seconds

### 6. **Sales Dashboard** (dashboard.html)
- 📊 **Real-time charts** that update automatically
- Statistics boxes showing:
  - Total Orders
  - Total Revenue
  - Pending Orders
  - Delivered Orders
- Multiple chart types:
  - Product Sales (Bar Chart)
  - Revenue Distribution (Doughnut)
  - Sales Trend (Line Chart)
  - Order Status (Bar Chart)
- Actionable insights
- Real-time updates every 10 seconds

### 7. **Customer Insights** (customer-insights.html)
- 👥 **Deep customer analytics**
- Statistics:
  - Total Customers
  - New vs Returning
  - Average Order Value
- Advanced charts:
  - Top Customers (Horizontal Bar)
  - New vs Returning Customers (Doughnut)
  - Spending Range Analysis
  - Orders per Customer
- Customer retention insights
- Auto-updating data

### 8. **Sales Trends** (sales.html)
- 📈 **Sales performance monitoring**
- Revenue and channel analytics
- Product performance tracking
- Daily sales trends (7-day view)
- Actionable business insights
- Real-time data updates

### 9. **Feedback** (feedback.html)
- Customer review section
- Rating system (1-5 stars)
- Profile info (name, gender)
- Firebase integration for data storage
- Real-time feedback updates
- Delete feedback option

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- npm packages installed

### Installation

1. **Install Dependencies:**
```bash
npm install express cors
```

2. **Start the Server:**
```bash
node server.js
```

You should see:
```
Server running at http://127.0.0.1:3000 🚀
```

3. **Open in Browser:**
```
http://localhost:3000
```

---

## 📊 Database Structure

### Orders Structure
```javascript
{
  id: 1,
  user_id: "user123",
  product_name: "T-Shirt",
  product_image: "url",
  price: 499,
  status: "Pending",  // Pending, Delivered, Cancelled
  date: "2024-03-29",
  mode: "online"      // online, offline
}
```

### Users Structure
```javascript
{
  email: "user@example.com",
  password: "password123",
  user_id: "user123"
}
```

---

## 🎯 Test User Credentials

### Default Test Account
- **Email:** `admin@example.com`
- **Password:** `1234`
- **User ID:** `user123`

### Quick Test Flow
1. Login with test credentials
2. Browse products (Men/Women categories)
3. Add products to order
4. View orders in "My Orders" section
5. Check real-time updates on dashboards

---

## 📈 Real-Time Features

### Auto-Updating Dashboards
All dashboards update automatically every 10 seconds:
- **Dashboard** - Product sales, revenue, trends
- **Customer Insights** - Customer behavior, spending patterns
- **Sales Trends** - Channel performance, top products
- **My Orders** - Order status updates

### Instant Notifications
- ✅ "Successfully Order Placed" popup when buying products
- Automatic page refresh on order cancellation
- Real-time order status updates

---

## 🎨 Design Features

### Professional UI Elements
- **Glassmorphism** effects on login
- **Chart.js** for beautiful data visualization
- **Responsive Design** for all devices
- **Gradient Backgrounds** for modern look
- **Smooth Animations** for better UX
- **Color-Coded Status** badges
- **Mobile-Optimized** layout

### Color Scheme
- Primary: `#0f172a` (Dark Navy)
- Success: `#22c55e` (Green)
- Info: `#3b82f6` (Blue)
- Warning: `#fef3c7` (Yellow)
- Danger: `#fee2e2` (Red)

---

## 🔄 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - Create new account

### Orders
- `POST /api/buy` - Place new order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:user_id` - Get user's orders
- `PUT /api/cancel/:id` - Cancel order

### Analytics
- `GET /api/dashboard-metrics` - Dashboard statistics
- `GET /api/customer-insights` - Customer analytics
- `GET /api/sales-metrics` - Sales data

### Utilities
- `GET /api/hello` - Server health check
- `GET /api/add-sample-orders` - Add demo orders

---

## 📱 Page Flow

```
index.html (Home)
    ↓
login.html (Login/Register)
    ↓
menu.html (Main Menu)
    ├─→ dashboard.html (Sales Dashboard)
    ├─→ customer-insights.html (Customer Analytics)
    ├─→ product.html (Product Catalog)
    │    ├─→ order.html (My Orders)
    │    └─→ [Place Order]
    ├─→ sales.html (Sales Trends)
    └─→ feedback.html (Customer Reviews)
```

---

## 🛠️ Troubleshooting

### Server Not Starting
```bash
# Check if port 3000 is already in use
netstat -ano | findstr :3000

# If in use, kill the process or use different port
```

### Charts Not Showing
- Check browser console for errors
- Ensure Chart.js is loading from CDN
- Check that `/api/dashboard-metrics` returns data

### Orders Not Appearing
- Verify user_id is stored in localStorage
- Check browser's localStorage in DevTools
- Restart server to reset in-memory database

### Firebase Errors in Feedback
- Update Firebase config in feedback.html
- Or use local storage instead (optional update)

---

## 📚 Project Structure

```
chat3/
├── index.html                 (Home page)
├── login.html                 (Authentication)
├── register.html              (User registration)
├── menu.html                  (Main navigation)
├── dashboard.html             (Sales dashboard)
├── customer-insights.html     (Customer analytics)
├── product.html               (Product catalog)
├── order.html                 (Order management)
├── sales.html                 (Sales trends)
├── feedback.html              (Customer feedback)
├── server.js                  (Backend/API)
├── style.css                  (Global styles)
├── script.js                  (Additional styles)
└── package.json               (Dependencies)
```

---

## 🎓 How to Use

### Placing an Order
1. Go to **Product Categories**
2. Click **"Buy Now"** on any product
3. See confirmation message ✅
4. Go to **My Orders** to track

### Viewing Analytics
1. Go to **Dashboard** to see sales metrics
2. Go to **Customer Insights** for behavioral data
3. Go to **Sales Trends** for channel analysis
4. All data updates in real-time!

### Cancelling Orders
1. Go to **My Orders**
2. Find your order
3. Click **"❌ Cancel Order"** button
4. Confirm cancellation

---

## ✨ Recent Improvements

✅ Professional order management (Amazon/Flipkart style)
✅ Real-time graph updates with auto-refresh
✅ Order statistics & filtering
✅ Beautiful success notifications
✅ Responsive mobile design
✅ Professional color scheme
✅ Improved dashboards with multiple charts
✅ Customer analytics dashboard
✅ Sales trends monitoring
✅ Order status tracking

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for errors
3. Verify server is running on port 3000
4. Check network requests in DevTools

---

## 📄 License

This project is for educational purposes. Feel free to modify and use as needed.

---

**Happy Shopping! 🛍️📊**
