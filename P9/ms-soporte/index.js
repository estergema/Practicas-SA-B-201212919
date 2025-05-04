import express from "express"
import cors from "cors"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { VertexAI } from "@google-cloud/vertexai"
import dotenv from "dotenv"
import fetch from "node-fetch"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3006

// Middleware
app.use(cors());
app.use(express.json())

// URL del endpoint de productos (configurable desde .env)
const PRODUCTS_API_URL = process.env.PRODUCTS_API_URL 
const ORDERS_API_URL = process.env.ORDERS_API_URL 

// Configuración para Google Cloud
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID
const LOCATION = process.env.GOOGLE_CLOUD_LOCATION || "us-central1"
const AGENT_ID = process.env.GOOGLE_CLOUD_AGENT_ID

// Inicializar Vertex AI para ConversationalAgent
let vertexAI

// Función para inicializar Vertex AI
async function initializeVertexAI() {
  try {
    // Si estamos en desarrollo y tenemos una ruta a las credenciales, las usamos
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.log(`Usando credenciales de: ${process.env.GOOGLE_APPLICATION_CREDENTIALS}`)
    } else {
      console.log("No se encontró GOOGLE_APPLICATION_CREDENTIALS, usando autenticación por defecto")
    }

    // Inicializar Vertex AI
    vertexAI = new VertexAI({
      project: PROJECT_ID,
      location: LOCATION,
    })

    if (AGENT_ID) {
      console.log(`ConversationalAgent configurado con ID: ${AGENT_ID}`)
    } else {
      console.warn("ADVERTENCIA: No se proporcionó GOOGLE_CLOUD_AGENT_ID. El ConversationalAgent no estará disponible.")
    }
  } catch (error) {
    console.error("Error al inicializar Vertex AI:", error)
  }
}

// Inicializar Vertex AI al arrancar el servidor
initializeVertexAI()

// Initialize Google Generative AI con API key (como respaldo)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

// Función para obtener productos del endpoint externo
async function fetchProducts(query = "") {
  try {
    const response = await fetch(PRODUCTS_API_URL+'/productos')
    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`)
    }

    let products = await response.json()

    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Función para obtener productos del endpoint externo
async function fetchOrdenes(query = "") {
  try {
    const response = await fetch(ORDERS_API_URL+'/orders')
    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.status}`)
    }

    let orders = await response.json()
    // Si hay una consulta, filtramos los productos
    return orders
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

// Endpoint para verificar el estado de la conexión con Google Cloud
app.get("/api/status", async (req, res) => {
  try {
    const status = {
      vertexAI: !!vertexAI,
      projectId: PROJECT_ID || "No configurado",
      location: LOCATION,
      agentId: AGENT_ID || "No configurado",
      genAI: !!genAI,
    }

    res.json(status)
  } catch (error) {
    console.error("Error checking status:", error)
    res.status(500).json({ error: "Error checking status" })
  }
})

// Almacén de sesiones de conversación (en memoria para desarrollo)
// En producción, esto debería ser una base de datos
const conversationSessions = new Map()

// Endpoint para el chatbot con ConversationalAgent
app.post("/api/chat-agent", async (req, res) => {
  try {
    const { messages, sessionId = "default" } = req.body

    // Verificar si tenemos Vertex AI configurado
    if (!vertexAI) {
      throw new Error("Vertex AI no inicializado. Verifica las variables de entorno GOOGLE_CLOUD_PROJECT_ID.")
    }

    // Verificar si tenemos el ID del agente
    if (!AGENT_ID) {
      throw new Error("ID del agente no configurado. Verifica la variable de entorno GOOGLE_CLOUD_AGENT_ID.")
    }

    // Obtener el último mensaje del usuario
    const lastMessage = messages[messages.length - 1].content
    
    // Crear un identificador único para la sesión si no existe
    if (!conversationSessions.has(sessionId)) {
      const uniqueSessionId = `session-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      conversationSessions.set(sessionId, uniqueSessionId)
    }
    
    const uniqueSessionId = conversationSessions.get(sessionId)
    
    try {
      // Construir el fully qualified ID para el servicio de Dialogflow
      const dfAgentPath = `projects/${PROJECT_ID}/locations/${LOCATION}/agents/${AGENT_ID}`
      
      // Acceder al servicio de agentes conversacionales
      // En las versiones más recientes de la API, debemos usar el método preview para acceder al agente conversacional
      const preview = vertexAI.preview
      
      if (!preview) {
        throw new Error("El objeto preview no está disponible en la instancia de VertexAI")
      }
      
      // Intentar acceder al servicio mediante varios métodos posibles en diferentes versiones API
      let service
      
      if (typeof preview.conversationalAgents === 'function') {
        service = preview.conversationalAgents()
      } else if (typeof preview.agents === 'function') {
        service = preview.agents()
      } else if (typeof vertexAI.conversationalAgents === 'function') {
        service = vertexAI.conversationalAgents()
      } else if (typeof vertexAI.agents === 'function') {
        service = vertexAI.agents()
      } else {
        throw new Error("No se pudo encontrar un método válido para acceder a los agentes conversacionales")
      }
      
      // Construir el path completo para la sesión
      const sessionPath = `${dfAgentPath}/sessions/${uniqueSessionId}`
      
      // Enviar el mensaje al agente conversacional
      const result = await service.converse({
        name: sessionPath,
        input: {
          text: lastMessage
        }
      })
      
      // Procesar la respuesta
      let responseText = ""
      let products = []
      
      if (result && result[0] && result[0].output && result[0].output.text) {
        responseText = result[0].output.text
        
        // Verificar si hay parámetros de búsqueda
        if (result[0].parameters && result[0].parameters.fields && result[0].parameters.fields.query) {
          const searchQuery = result[0].parameters.fields.query.stringValue || ""
          if (searchQuery) {
            products = await fetchProducts(searchQuery)
          }
        }
      } else {
        responseText = "Lo siento, no pude procesar tu solicitud."
      }
      
      // Devolver la respuesta
      res.json({
        role: "assistant",
        content: responseText,
        products: products.length > 0 ? products : null,
      })
    } catch (innerError) {
      console.error("Error específico en la interacción con el agente:", innerError)
      
      // Si falla el método principal, intentamos un método alternativo
      try {
        console.log("Intentando método alternativo (usando el API de Gemini directamente)")
        // Fallback a usar el modo simple con Gemini
        // Configurar el modelo sin herramientas
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-pro",
        })
        
        // Enviar la pregunta al modelo
        const result = await model.generateContent(lastMessage)
        const response = await result.response
        
        // Devolver la respuesta
        res.json({
          role: "assistant",
          content: response.text() || "No pude generar una respuesta.",
          products: null,
          fallback: true
        })
      } catch (fallbackError) {
        throw new Error(`Error en método principal: ${innerError.message}. Error en fallback: ${fallbackError.message}`)
      }
    }
  } catch (error) {
    console.error("Error in chat-agent endpoint:", error)
    res.status(500).json({
      error: "Error processing your request",
      details: error.toString(),
    })
  }
})

// Endpoint alternativo simplificado para chatbot sin ConversationalAgent
app.post("/api/chat-simple", async (req, res) => {
  try {
    const { messages } = req.body

    // Configurar el modelo sin herramientas
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    })

    // Crear el historial de chat para el modelo
    const chat = model.startChat({
      history: messages.slice(0, -1).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    })

    // Obtener la última pregunta del usuario
    const userQuestion = messages[messages.length - 1].content

    // Enviar la pregunta al modelo
    const result = await chat.sendMessage(userQuestion)
    const response = await result.response

    // Verificar si el mensaje contiene una consulta de productos
    let products = []
    let orders = {}
    if (
      (userQuestion.toLowerCase().includes("busca") ||
      userQuestion.toLowerCase().includes("encuentra") ||
      userQuestion.toLowerCase().includes("muestra"))
    ){
        if (userQuestion.toLowerCase().includes("productos")) {
        // Extraer posibles términos de búsqueda
        const searchTerms = userQuestion.split(" ").filter((word) => word.length > 3)
        if (searchTerms.length > 0) {
          // Usar el término más largo como consulta
          const searchQuery = searchTerms.reduce((a, b) => (a.length > b.length ? a : b))
          products = await fetchProducts(searchQuery)
        }
      } else if( userQuestion.toLowerCase().includes("ordenes") ) {
        // Extraer posibles términos de búsqueda
        const searchTerms = userQuestion.split(" ").filter((word) => word.length > 3)
        if (searchTerms.length > 0) {
          // Usar el término más largo como consulta
          const searchQuery = searchTerms.reduce((a, b) => (a.length > b.length ? a : b))
          orders = await fetchOrdenes(searchQuery)
        }
      }
    }
    // Devolver la respuesta
    res.json({
      role: "assistant",
      content: response.text(),
      products: products.length > 0 ? products : null,
      orders: orders.length > 0 ? orders : null,
    })
  } catch (error) {
    console.error("Error in chat-simple endpoint:", error)
    res.status(500).json({
      error: "Error processing your request",
      details: error.toString(),
    })
  }
})

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "ms-soporte",
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`ms-soporte activo en http://localhost:${PORT}`);
});
