class Order {
    constructor(id, userId, products, status, createdAt) {
      this.id = id;
      this.userId = userId;
      this.products = products;
      this.status = status;
      this.createdAt = new Date(createdAt);
      this.totalAmount = this.calculateTotal();
    }
}

  module.exports = Order;