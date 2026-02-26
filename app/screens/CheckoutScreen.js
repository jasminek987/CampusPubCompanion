import React from 'react';
import { Button, View } from 'react-native';
import OrderService from '../services/OrderService';
import { useCartStore } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems } = useCartStore();

  const handleCheckout = () => {
    const order = OrderService.createOrder(cartItems);
    navigation.navigate('OrderSuccess', { order });
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Place Order" onPress={handleCheckout} />
    </View>
  );
}