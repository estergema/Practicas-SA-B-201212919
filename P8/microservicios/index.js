const express = require("express")
const promClient = require("prom-client")
const winston = require("winston")
const { ElasticsearchTransport } = require("winston-elasticsearch")


// Aplicación Express
const app = express()
const PORT = process.env.PORT || 8080

// Middleware para métricas
app.use((req, res, next) => {
  const start = Date.now()

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000

    httpRequestDurationMicroseconds.labels(req.method, req.route?.path || req.path, res.statusCode).observe(duration)

    httpRequestsTotal.labels(req.method, req.route?.path || req.path, res.statusCode).inc()

    // Logging
    logger.info(`${req.method} ${req.url} ${res.statusCode} ${duration}s`, {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: duration,
    })

    if (res.statusCode >= 400) {
      logger.error(`Error processing request: ${req.method} ${req.url} ${res.statusCode}`, {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: duration,
      })
    }
  })

  next()
})

// Endpoint para métricas de Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType)
  res.end(await register.metrics())
})

// Rutas de ejemplo
app.get("/", (req, res) => {
  logger.info("Request to root endpoint")
  res.send("Hello World!")
})

app.get("/users", (req, res) => {
  logger.info("Fetching users")
  res.json([
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ])
})

app.get("/error", (req, res) => {
  logger.error("This is a test error")
  res.status(500).send("Something went wrong")
})

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
