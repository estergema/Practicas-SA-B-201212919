**Manual de Uso de GraphQL en Node.js**

## Introducción a GraphQL
GraphQL es un lenguaje de consulta para APIs que permite solicitar exactamente los datos necesarios y nada más. A diferencia de REST, que requiere múltiples endpoints, GraphQL expone un solo endpoint desde donde se pueden realizar todas las consultas y mutaciones necesarias.

## Instalación y Configuración
Para comenzar con GraphQL en Node.js, es necesario instalar los siguientes paquetes:

```sh
mkdir graphql-nodejs
cd graphql-nodejs
npm init -y
npm install express express-graphql graphql cors
```

### Configuración de Express y GraphQL
```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();
app.use(cors());

// Definir el esquema GraphQL
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Resolver funciones para GraphQL
const root = {
  hello: () => '¡Hola, GraphQL!'
};

// Configuración del servidor GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Interfaz visual para probar consultas
}));

app.listen(4000, () => console.log('Servidor GraphQL en http://localhost:4000/graphql'));
```

## Definición de Tipos y Consultas
En GraphQL, los datos se definen mediante un esquema. Por ejemplo, si queremos definir un esquema para gestionar usuarios:

```javascript
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    age: Int
  }

  type Query {
    getUser(id: ID!): User
  }
`);

const users = [
  { id: '1', name: 'Juan', age: 25 },
  { id: '2', name: 'María', age: 30 }
];

const root = {
  getUser: ({ id }) => users.find(user => user.id === id)
};
```

## Mutaciones en GraphQL
Las mutaciones permiten modificar datos en el servidor. Por ejemplo, agregar un usuario:

```javascript
const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    age: Int
  }

  type Query {
    getUser(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, age: Int!): User
  }
`);

let users = [
  { id: '1', name: 'Juan', age: 25 },
  { id: '2', name: 'María', age: 30 }
];

const root = {
  getUser: ({ id }) => users.find(user => user.id === id),
  addUser: ({ name, age }) => {
    const newUser = { id: String(users.length + 1), name, age };
    users.push(newUser);
    return newUser;
  }
};
```

## Consultas y Mutaciones en GraphQL

### Ejemplo de Consulta
```graphql
{
  getUser(id: "1") {
    name
    age
  }
}
```

### Ejemplo de Mutación
```graphql
mutation {
  addUser(name: "Carlos", age: 28) {
    id
    name
    age
  }
}
```
