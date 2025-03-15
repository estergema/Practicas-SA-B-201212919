const express = require("express")
const bodyParser = require("body-parser")
const  global = require('./src/const/global');

const app = express()

// Middleware
app.use(bodyParser.json())

// In-memory database for demonstration
const orders = [
  {
    id: "1",
    userId: "1",
    products: [
      { productId: "1", name:"name1", quantity: 2, price: 799.99 },
      { productId: "3", name:"name3", quantity: 1, price: 249.99 },
    ],
    totalAmount: 1849.97,
    status: "completed",
    createdAt: "2023-09-15T10:30:00Z",
  },
  {
    id: "2",
    userId: "2",
    products: [{ productId: "1", name:"name1", quantity: 2, price: 1299.99 }],
    totalAmount: 1299.99,
    status: "processing",
    createdAt: "2023-09-16T14:20:00Z",
  },
]

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "orders" })
})

// Get all orders
app.get("/orders", (req, res) => {
  res.json(orders)
})

// Create a new order
app.post("/orders", (req, res) => {
  const { userId, products } = req.body

  if (!userId || !products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Invalid order data" })
  }

  const totalAmount = products.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const newOrder = {
    id: String(orders.length + 1),
    userId,
    products,
    totalAmount,
    status: "pending",
    createdAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  res.status(201).json(newOrder)
})

app.listen(global.PORT, () => {
  console.log(`Orders service running at http://localhost:${global.PORT}`)
})

