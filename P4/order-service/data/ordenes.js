const orders = [
    {
      id: "1",
      userId: "1",
      products: [
        { productId: "1", name:"name1", quantity: 2, price: 799.99 },
        { productId: "3", name:"name3", quantity: 1, price: 249.99 },
      ],
      total: 1849.97,
      status: "completed",
      createdAt: "2023-09-15T10:30:00Z",
    },
    {
      id: "2",
      userId: "2",
      products: [{ productId: "1", name:"name1", quantity: 2, price: 1299.99 }],
      total: 1299.99,
      status: "processing",
      createdAt: "2023-09-16T14:20:00Z",
    },
  ]

module.exports = orders;