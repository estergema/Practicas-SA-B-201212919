# Chatbot con Node.js, React-Vite y Google Cloud AI

Este proyecto implementa un chatbot utilizando Node.js como backend, React-Vite como frontend y Google Cloud AI para la funcionalidad del chatbot.

## Características

- Interfaz de chat intuitiva
- Integración con Google Cloud AI 
- Diseño responsive


## Pantalla Inicial
![Image](https://github.com/user-attachments/assets/1acabdcb-c79c-4df5-9cea-1566fd8ffd53)

## Descripción de la Interfaz

1. **Encabezado (Barra superior azul):**
   - **Título:** `Asistente` – Indica que estás en el chat del asistente virtual.
   - **Estado de conexión:** Un distintivo verde que dice `Conectado al Agente IA`, confirma que el asistente está activo y listo para ayudarte.

2. **Mensaje de bienvenida:**
   - El asistente inicia la conversación con el mensaje:
     > *¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?*
   - Este mensaje aparece en una burbuja gris clara al centro de la pantalla.

3. **Zona de conversación:**
   - Espacio blanco donde se mostrarán los mensajes enviados y las respuestas del asistente.

4. **Campo de entrada de texto (parte inferior):**
   - Una barra negra donde puedes escribir tu mensaje. El texto tenue dice: `Escribe tu mensaje...`
   - A la derecha, hay un botón gris claro con la palabra **Enviar**. Haz clic allí para mandar tu mensaje al asistente.

---

## ¿Cómo utilizarlo?

1. **Escribe tu pregunta o solicitud** en el campo de texto  
   Ejemplo: `"Busca los productos disponibles"`

2. **Presiona el botón “Enviar” o la tecla "Enter"** para que el asistente reciba tu mensaje.

3. **Lee la respuesta** que aparecerá en pantalla. Que sera como la siguiente:

![Image](https://github.com/user-attachments/assets/38bf883c-1dfb-4e0e-8ba7-3127880a82a2)
- **Una peticion para saber mas detalles del producto que estas buscando**
- **Resultados de búsqueda (sección inferior):**
   - Título: `Productos encontrados`
   - Los productos aparecen en tarjetas organizadas por fila, con:
     - **Nombre del producto** (ej. Cuaderno)
     - **Precio** (ej. Q25)
     - **Botón negro:** `Agregar al carrito`

4. **Continúa la conversación** tantas veces como necesites como la siguiente imagen para hacer una busqueda de ordenes de compra de productos. 

`Busca órdenes de compra`

![Image](https://github.com/user-attachments/assets/2b4b4c1e-de66-4177-8697-5df555ede20f)

**Resultados de búsqueda:**
   - Sección: `Órdenes encontradas`
   - Las órdenes aparecen en tarjetas que contienen:
     - **Fecha de la orden**
     - **Monto total** (en quetzales)
     - **Estado de la orden:** `completed`, `processing`, etc.

---

## Recomendaciones

- Escribe mensajes **claros y específicos**.
- Evita usar abreviaciones excesivas o jerga técnica (a menos que sea necesario).
- Puedes preguntar sobre servicios, ayuda técnica, información general o instrucciones paso a paso.

---