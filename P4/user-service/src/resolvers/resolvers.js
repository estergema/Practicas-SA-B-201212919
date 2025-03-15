// In-memory database for demonstration
const users = [
    {
      id: "1",
      username: "john_doe",
      email: "john@example.com",
      full_name: "John Doe",
      is_active: true,
    },
    {
      id: "2",
      username: "jane_smith",
      email: "jane@example.com",
      full_name: "Jane Smith",
      is_active: true,
    },
  ]
  
  const resolvers = {
    Query: {
      users: () => users,
      user: (_, { id }) => users.find((user) => user.id === id),
    },
    Mutation: {
      createUser: (_, { username, email, full_name }) => {
        const newUser = {
          id: String(users.length + 1),
          username,
          email,
          full_name,
          is_active: true,
        }
        users.push(newUser)
        return newUser
      },
      updateUser: (_, { id, username, email, full_name }) => {
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) return null
  
        const updatedUser = { ...users[index] }
  
        if (username) updatedUser.username = username
        if (email) updatedUser.email = email
        if (full_name) updatedUser.full_name = full_name
  
        users[index] = updatedUser
        return updatedUser
      },
      deleteUser: (_, { id }) => {
        const index = users.findIndex((user) => user.id === id)
        if (index === -1) return false
  
        users.splice(index, 1)
        return true
      },
    },
  }
  
  module.exports = { resolvers }
  
  