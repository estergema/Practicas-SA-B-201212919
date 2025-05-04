import React, { useState, useEffect, useRef } from 'react';
import './ChatbotApp.css';

const baseSoporte = import.meta.env.VITE_URL_API_SOPORTE;
const baseCompras = import.meta.env.VITE_URL_API_COMPRAS;

const ChatbotApp = ({ usuario }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [sessionId, setSessionId] = useState(`session-${Date.now()}`);
  const messagesEndRef = useRef(null);
  const [datosUsuario, setDatosUsuario] = useState(null);
  // Verificar el estado de la conexión al cargar el componente
  useEffect(() => {
    const checkStatus = async () => {
      try {
        setDatosUsuario(usuario);
        const response = await fetch(`${baseSoporte}/api/status`);
        const data = await response.json();
        
        if (data.vertexAI && data.projectId !== 'No configurado' && data.agentId !== 'No configurado') {
          setConnectionStatus('connected');
        } else if (data.genAI) {
          setConnectionStatus('fallback');
        } else {
          setConnectionStatus('error');
        }
      } catch (error) {
        console.error('Error al verificar el estado:', error);
        setConnectionStatus('error');
      }
    };
    
    checkStatus();
  }, [usuario]);
  
  // Hacer scroll automático al final del chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Manejar el envío de mensajes
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Agregar mensaje del usuario al chat
    const newMessages = [
      ...messages,
      { role: 'user', content: inputMessage }
    ];
    
    setMessages(newMessages);
    setIsLoading(true);
    setInputMessage('');
    
    try {
      // Determinar qué endpoint usar según el estado de conexión
      //const endpoint = connectionStatus === 'connected' 
      //  ? 'http://localhost:3006/api/chat-simple' 
      //  : 'http://localhost:3006/api/chat-agent';

      const endpoint = `${baseSoporte}/api/chat-simple`
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          sessionId: sessionId
        }),
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Agregar respuesta del asistente
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: data.content 
      }]);
      console.log(data)
      // Mostrar productos si hay disponibles
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
      }
      if (data.orders && data.orders.length > 0) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: 'Lo siento, ocurrió un error al procesar tu mensaje. Por favor, intenta nuevamente.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Renderizar la tarjeta de un producto
  const ProductCard = ({ product }) => (
    <div className="product-card">
      {product.image && (
        <div className="product-image">
          <img src={product.image} alt={product.nombre} />
        </div>
      )}
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p className="product-price">Q{product.precio}</p>
        <button
          className="boton-comprar"
          onClick={() => agregarAlCarrito(product.idProducto)}
        >
        Agregar al carrito</button>
      </div>
    </div>
  );
  
  // Renderizar la tarjeta de un producto
  const OrderCard = ({ product }) => (
    <div className="product-card">
      <div className="product-info">
        <h3>{product.createdAt}</h3>
        <p className="product-price">Q{product.total}</p>
        <p className="product-price">{product.status}</p>
      </div>
    </div>
  );

  // Mostrar indicador de estado de conexión
  const ConnectionIndicator = () => {
    let statusText = '';
    let statusClass = '';
    
    switch (connectionStatus) {
      case 'checking':
        statusText = 'Verificando conexión...';
        statusClass = 'status-checking';
        break;
      case 'connected':
        statusText = 'Conectado al Agente IA';
        statusClass = 'status-connected';
        break;
      case 'fallback':
        statusText = 'Usando modo simple (sin agente)';
        statusClass = 'status-fallback';
        break;
      case 'error':
        statusText = 'Error de conexión';
        statusClass = 'status-error';
        break;
      default:
        statusText = 'Estado desconocido';
        statusClass = 'status-error';
    }
    
    return (
      <div className={`connection-status ${statusClass}`}>
        {statusText}
      </div>
    );
  };

  const agregarAlCarrito = async (idProducto) => {
    try {
      alert("Producto agregado al carrito");
    } catch (error) {
      console.error(error);
      alert("No se pudo agregar al carrito");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Asistente</h2>
        <ConnectionIndicator />
      </div>
      
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant-message">
            <div className="loading-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {products.length > 0 && (
        <div className="products-container">
          <h3>Productos encontrados</h3>
          <div className="products-grid">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      )}
      {orders.length > 0 && (
        <div className="products-container">
          <h3>Ordenes encontradas</h3>
          <div className="products-grid">
            {orders.map((order, index) => (
              <OrderCard key={index} product={order} />
            ))}
          </div>
        </div>
      )}
      
      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputMessage.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
}

export default ChatbotApp;