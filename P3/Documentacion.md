# Practica 3

Estrellita Guadalupe Armas Monroy - 201212919

### DESCRIPCION DEL PROBLEMA

#### Diagrama de arquitectura monolitica

![er](/P3/Imagenes/Monolitico.png) 

El diagrama muestra los principales componentes y flujos del sistema de planillas actual:

- Autenticación:
    - Servicio OAuth con tokens de 12 horas
    - Limitado en gestión de permisos y accesos
- Procesamiento de Planillas:
    - Carga de archivos CSV
    - Proceso monolítico
    - 3 pasos de aprobación 
    - Validaciones internas
- Almacenamiento:
    - Archivos almacenados en un servidor
    - Sin detalles específicos de implementación
- Integración:
    - Envío al sistema financiero externo
    - Sin proceso de notificación automatizado
- Problemas Identificados:
    - Rendimiento lento
    - Cuellos de botella
    - Limitaciones de escalabilidad

#### Principales desafíos de este tipo de arquitecura:

- Arquitectura monolítica que ralentiza el procesamiento
- Sistema de autenticación y permisos limitado
- Falta de flexibilidad en el procesamiento de planillas
- Ausencia de un sistema robusto de logging y trazabilidad

#### Recomendaciones para la nueva solución:

- Migrar a una arquitectura de microservicios
- Implementar un sistema de autenticación más granular
- Diseñar un flujo de aprobación más eficiente
- Integrar un sistema de logging robusto
- Considerar servicios en la nube para almacenamiento y procesamiento 

### Diagrama de arquitectura de microservicios

![er](/P3/Imagenes/Microservicio.png)

# Diagrama de Arquitectura del Sistema

## Descripción General
Este es un diagrama de estilo UML que representa un sistema con múltiples servicios y bases de datos interconectados.

## Componentes y Servicios

### Servicios de Autenticación
- **Token de Autenticación**
  - Atributos: `tiempo de expiración: int`

- **Servicio OAuth**
  - Métodos: 
    - `autenticar(credenciales)`
    - Generación de `token`

- **Servicio de Autenticación**
  - Métodos:
    - `gestionarPermisos(usuario)`
    - `gestionarAcceso(usuario)`

### Servicios de Usuario
- **Interfaz de Usuario**
  - Métodos:
    - `consultarHistorial()`
    - `descargarNómina()`

- **Base de Datos de Usuarios**

### Servicios Principales
- **Servicio de Finanzas**
  - Métodos:
    - `procesarNómina()`

- **Servicio de Planillas**
  - Métodos:
    - `subirCSV(archivo)`
    - `validarCSV(archivo)`
    - `validarSolicitud(nómina)`
    - `aprobarEstado(nómina)`

- **Servicio de Almacenamiento**
  - Métodos:
    - `almacenarArchivo(nombreArchivo)`

- **Servicio de Correo**
  - Métodos:
    - `enviarCorreo(destinatarios, asunto, cuerpo)`

- **Servicio de Historial**
  - Métodos:
    - `guardarRegistro(evento)`
    - `registrarIngreso()`
    - `consultarRegistro(criterios)`

### Bases de Datos
- Base de Datos de Planillas
- Base de Datos de Historial
- Base de Datos de Usuarios


## Interacciones Principales
1. El usuario se autentica a través del Servicio OAuth y la validacion de sus permisos
2. La Interfaz de Usuario interactúa con varios servicios
3. El procesamiento de nómina involucra validaciones de múltiples servicios
4. Se realizan registros de logs en diferentes interacciones de servicios
