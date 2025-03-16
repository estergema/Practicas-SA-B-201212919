const express = require("express")
const bodyParser = require("body-parser")
const  global = require('./src/const/global');
const ordenes_dummy = require('./data/ordenes')

const app = express()

let ordenes = ordenes_dummy;
// Middleware
app.use(bodyParser.json())

// Health check endpoint
app.get("/check", (req, res) => {
  res.status(200).json({ status: "ok", service: "orders" })
})

// Get all orders
app.get("/orders", (req, res) => {
  res.json(ordenes)
})

app.listen(global.PORT, () => {
  console.log(`Orders service running at http://localhost:${global.PORT}`)
})

