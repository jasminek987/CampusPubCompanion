import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { useCartStore } from '../context/CartContext';

export default function CartScreen({ navigation }) {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCartStore();

  const total = cartItems.reduce(
    (sum, row) => sum + row.item.price * row.quantity,
    0
  );

  const renderRow = ({ item: row }) => (
    <View
      style={{
        padding: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 8,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{row.item.name}</Text>
      <Text>Price: ${row.item.price}</Text>
      <Text>Quantity: {row.quantity}</Text>

      <View style={{ flexDirection: 'row', marginTop: 10, gap: 10 }}>
        <TouchableOpacity
          onPress={() => decreaseQuantity(row.item.id)}
          style={{ padding: 10, borderWidth: 1, borderRadius: 6 }}
        >
          <Text>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => increaseQuantity(row.item.id)}
          style={{ padding: 10, borderWidth: 1, borderRadius: 6 }}
        >
          <Text>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => removeFromCart(row.item.id)}
          style={{ padding: 10, borderWidth: 1, borderRadius: 6 }}
        >
          <Text>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 12 }}>
        Cart
      </Text>

      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(row) => row.item.id.toString()}
          renderItem={renderRow}
        />
      )}

      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Total: ${total.toFixed(2)}
      </Text>

      <View style={{ marginTop: 10 }}>
  <Button
    title="Add More Items"
    onPress={() => navigation.navigate('Menu')}
  />
</View>
      <View style={{ marginTop: 12 }}>
        <Button
          title="Checkout"
          onPress={() => navigation.navigate('Checkout')}
        />
      </View>
    </View>
  );

}

