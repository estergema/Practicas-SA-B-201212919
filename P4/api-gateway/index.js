const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const cors = require("cors")
const  global = require('./src/const/global');

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "api-gateway" })
})

// Routes for Product Service (GraphQL)
app.use(
  "/products",
  createProxyMiddleware({
    target: global.PRODUCT_SERVICE_URL,
    pathRewrite: {
      "^/products": "/graphql",
    },
    changeOrigin: true,
  }),
)

// Routes for User Service (GraphQL)
app.use(
  "/users",
  createProxyMiddleware({
    target: global.USER_SERVICE_URL,
    pathRewrite: {
      "^/users": "/graphql",
    },
    changeOrigin: true,
  }),
)

// Routes for Order Service (REST)
app.use(
  "/orders",
  createProxyMiddleware({
    target: global.ORDER_SERVICE_URL,
    pathRewrite: {
      "^/orders": "/orders",
    },
    changeOrigin: true,
  }),
)

// Routes for Notification Service (REST)
app.use(
  "/notifications",
  createProxyMiddleware({
    target: global.NOTIFICATION_SERVICE_URL,
    pathRewrite: {
      "^/notifications": "/notifications",
    },
    changeOrigin: true,
  }),
)

// Catch-all route for health checks of individual services
app.get("/services/:service/health", async (req, res) => {
  const { service } = req.params
  let serviceUrl

  switch (service) {
    case "products":
      serviceUrl = `${global.PRODUCT_SERVICE_URL}/health`
      break
    case "users":
      serviceUrl = `${global.USER_SERVICE_URL}/health`
      break
    case "orders":
      serviceUrl = `${global.ORDER_SERVICE_URL}/health`
      break
    case "notifications":
      serviceUrl = `${global.NOTIFICATION_SERVICE_URL}/health`
      break
    default:
      return res.status(404).json({ error: "Service not found" })
  }

  try {
    const response = await fetch(serviceUrl)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: `Failed to reach ${service} service`, details: error.message })
  }
})

app.listen(global.PORT, () => {
  console.log(`API Gateway running at http://localhost:${global.PORT}`)
})

