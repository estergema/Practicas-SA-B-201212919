# Descripción Detallada de las Herramientas Utilizadas

Este documento proporciona información detallada sobre las principales tecnologías y herramientas utilizadas en el proyecto de chatbot de compras, incluyendo sus funcionalidades, precios, restricciones y alternativas.

## Índice
1. [Google Cloud Vertex AI](#google-cloud-vertex-ai)
3. [Dialogflow (Google Conversation API)](#dialogflow-google-conversation-api)

---

## Google Cloud Vertex AI

### Descripción General
Vertex AI es una plataforma unificada de Google Cloud para el desarrollo y despliegue de modelos de machine learning (ML) y aplicaciones de inteligencia artificial (IA). Proporciona herramientas para todo el ciclo de vida de ML, desde la preparación de datos hasta el entrenamiento, despliegue y gestión de modelos.

### Funcionalidades Clave
- **Conversational Agents**: Permite crear agentes conversacionales avanzados que pueden entender el lenguaje natural, mantener el contexto de la conversación y realizar acciones específicas.
- **AutoML**: Herramientas para entrenar modelos personalizados sin necesidad de experiencia en ML.
- **Custom Training**: Opciones para entrenar modelos personalizados con código propio.
- **Feature Store**: Almacenamiento centralizado para características de ML.
- **Model Monitoring**: Supervisión del rendimiento de los modelos en producción.
- **Pipelines**: Automatización de flujos de trabajo de ML.
- **Explainable AI**: Herramientas para entender las predicciones de los modelos.

### Estructura de Precios
Vertex AI utiliza un modelo de precios basado en el consumo:

1. **Conversational Agents**:
   - **Dialogflow CX**: 
     - $0.007 por solicitud de texto
     - $0.0065 por minuto de audio procesado
     - Cuota gratuita mensual: 100 solicitudes de texto y 1,000 minutos de audio

2. **Vertex AI Prediction**:
   - Varía según el tipo de modelo y recursos utilizados
   - Desde $0.0125 por hora de nodo para modelos pequeños
   - Hasta $3.5+ por hora para modelos grandes con GPUs

3. **Vertex AI Training**:
   - Desde $0.10 por hora para CPUs básicas
   - Hasta $8+ por hora para configuraciones con múltiples GPUs

### Limitaciones y Restricciones
- **Cuotas de API**: Límites en el número de solicitudes por minuto/día
- **Disponibilidad regional**: No todas las funciones están disponibles en todas las regiones
- **Tamaño de los modelos**: Restricciones en el tamaño de los modelos personalizados
- **Tiempo de entrenamiento**: Límites en la duración del entrenamiento de modelos
- **Almacenamiento**: Límites en el almacenamiento de datos y modelos

### Casos de Uso Recomendados
- Chatbots y asistentes virtuales avanzados
- Sistemas de recomendación personalizados
- Análisis predictivo
- Procesamiento de lenguaje natural
- Visión por computadora
- Detección de anomalías

### Alternativas
- Amazon SageMaker
- Microsoft Azure Machine Learning
- IBM Watson
- DataRobot
- H2O.ai

---

## Dialogflow (Google Conversation API)

### Descripción General
Dialogflow es una plataforma de comprensión del lenguaje natural desarrollada por Google que facilita el diseño e integración de interfaces conversacionales en aplicaciones, sitios web, dispositivos, bots, sistemas de respuesta de voz interactiva y más. Existen dos versiones principales: Dialogflow ES (Essentials) y Dialogflow CX (Customer Experience).

### Versiones Principales

#### Dialogflow ES (Essentials)
- Versión original y más simple
- Ideal para chatbots básicos a moderadamente complejos
- Estructura basada en intents y entities
- Interfaz más sencilla y fácil de aprender

#### Dialogflow CX (Customer Experience)
- Versión avanzada para conversaciones complejas
- Basada en estados, flujos y páginas
- Permite gestionar conversaciones con múltiples giros y cambios de contexto
- Mejor para equipos grandes y casos de uso empresariales

### Funcionalidades Clave
- **Comprensión del Lenguaje Natural (NLU)**: Capacidad para entender el lenguaje humano y extraer intenciones y entidades.
- **Gestión de Contexto**: Mantiene el contexto de la conversación para respuestas más naturales.
- **Fulfillment**: Permite conectar con servicios externos para realizar acciones específicas.
- **Integración Multicanal**: Funciona con múltiples plataformas como web, móvil, Google Assistant, Facebook Messenger, etc.
- **Soporte Multilingüe**: Admite más de 30 idiomas y variantes.
- **Análisis de Conversaciones**: Proporciona métricas y análisis sobre las interacciones.
- **Validación de Formularios**: Recopilación y validación de datos del usuario.
- **Respuestas Enriquecidas**: Soporte para respuestas con imágenes, botones, carruseles, etc.

### Estructura de Precios

#### Dialogflow ES
- **Edición Estándar**: Gratuita
  - 180 solicitudes por minuto
  - Hasta 1,000 solicitudes de texto al mes
  - Hasta 1,000 solicitudes de audio al mes (15 segundos cada una)

- **Edición Enterprise**:
  - Texto: $0.002 por solicitud
  - Audio: $0.0065 por 15 segundos
  - Knowledge Connector: $0.002 por solicitud
  - Soporte para cumplimiento de normativas (HIPAA, etc.)

#### Dialogflow CX
- **Precio base**:
  - Solicitudes de texto: $0.007 por solicitud
  - Solicitudes de audio: $0.0065 por 15 segundos
  - Cuota gratuita mensual: 100 solicitudes de texto y 1,000 minutos de audio

- **Precios por volumen**:
  - Descuentos disponibles para grandes volúmenes
  - Contratos personalizados para empresas

### Limitaciones y Restricciones
- **Cuotas de API**: Límites en el número de solicitudes por minuto/día
- **Complejidad de conversación**: ES tiene limitaciones para conversaciones muy complejas
- **Disponibilidad regional**: No todas las funciones están disponibles en todas las regiones
- **Tamaño de los modelos**: Limitaciones en el tamaño de los modelos de entrenamiento
- **Integraciones**: Algunas integraciones requieren configuración adicional
- **Latencia**: Puede haber latencia en respuestas para modelos complejos
- **Personalización**: Limitaciones en la personalización profunda del modelo base

### Casos de Uso Recomendados
- **Dialogflow ES**:
  - Chatbots simples para atención al cliente
  - Asistentes virtuales básicos
  - Bots para redes sociales
  - Aplicaciones de voz simples

- **Dialogflow CX**:
  - Centros de contacto virtuales
  - Asistentes de compras complejos
  - Sistemas de reserva multipasos
  - Aplicaciones conversacionales empresariales
  - Flujos de trabajo complejos con múltiples caminos

### Alternativas
- Microsoft Bot Framework
- Amazon Lex
- IBM Watson Assistant
- Rasa
- Botpress
- Yellow.ai
- ManyChat
- Avaamo

---
