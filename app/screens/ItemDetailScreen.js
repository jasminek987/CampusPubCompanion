import React from 'react';
import { View, Text, Button } from 'react-native';
import { useCartStore } from '../context/CartContext';

export default function ItemDetailScreen({ route, navigation }) {
  const { item } = route.params;

  if (!item) return <Text>No item found</Text>;
  const { addToCart } = useCartStore();

return (
  <View>
    <Text>{item.name}</Text>
    <Text>${item.price}</Text>
    <Text>{item.description}</Text>

    <Button
  title="Add to Cart"
  onPress={() => {
    addToCart(item);
    console.log("ADDED:", item.name);
    navigation.navigate("Cart");
  }}
/>
    <Button title="Back" onPress={() => navigation.goBack()} />
  </View>
);
}