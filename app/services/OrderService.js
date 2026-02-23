const OrderService = {
  createOrder(cartItems) {
    const orderNumber = Date.now().toString(15).toUpperCase();

    return {
      orderNumber,
      items: cartItems,
      createdAt: new Date().toISOString(),
    };
  },
};

export default OrderService;