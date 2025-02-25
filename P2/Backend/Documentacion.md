# Documentación Backend Node.js

## 1. Herramientas de Backend Node Utilizadas

### Node.js

Node.js es un entorno de ejecución para JavaScript construido con el motor V8 de Chrome que permite ejecutar código JavaScript en el servidor.

#### Ventajas:
- Ejecución asíncrona y no bloqueante
- Alta escalabilidad
- Gran ecosistema de paquetes (npm)
- Mismo lenguaje en frontend y backend
- Ideal para aplicaciones en tiempo real

#### Desventajas:
- No óptimo para tareas con uso intensivo de CPU
- Callbacks pueden llevar a "callback hell"
- Menos maduro que otras plataformas para ciertas operaciones

### Express.js

Framework minimalista para Node.js que facilita la creación de aplicaciones web y APIs.

#### Ventajas:
- Ligero y flexible
- Fácil de aprender y usar
- Gran soporte para middleware
- Enrutamiento potente

#### Desventajas:
- Minimalista, requiere configuración adicional para proyectos grandes
- No impone estructura, puede llevar a código desorganizado

### SQL Server como Base de Datos

#### Ventajas:
- Alta fiabilidad y estabilidad
- Excelente rendimiento y escalabilidad
- Robustas características de seguridad
- Potentes herramientas de administración
- Soporte para procedimientos almacenados y transacciones complejas

#### Desventajas:
- Mayor costo comparado con soluciones open-source
- Requiere más recursos de hardware
- Mayor complejidad de configuración
- Menos flexible para cambios de esquema rápidos
- La integración con Node.js requiere configuración adicional

### Conexión a SQL Server desde Node.js

Para conectar Node.js con SQL Server se utiliza típicamente el paquete `mssql` o `tedious`.

```javascript
const sql = require('mssql');

const config = {
  user: 'username',
  password: 'password',
  server: 'localhost',
  database: 'database',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function connectDB() {
  try {
    await sql.connect(config);
    console.log('Conectado a SQL Server');
  } catch (err) {
    console.error('Error al conectar a SQL Server:', err);
  }
}
```

![er](./P2/DIAGRAMA.png)
