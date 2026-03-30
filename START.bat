#!/bin/bash
# Quick Start Guide for E-Commerce Dashboard

echo "🚀 Starting E-Commerce Dashboard Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm is installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install express cors

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🌐 Starting server on http://127.0.0.1:3000"
echo ""
echo "Test Credentials:"
echo "  Email: admin@example.com"
echo "  Password: 1234"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
node server.js
