import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OrderService from '../services/OrderService';
import { useCartStore } from '../context/CartContext';

export default function CheckoutScreen({ navigation }) {
  const { cartItems } = useCartStore();

  const total = cartItems.reduce((sum, row) => {
    const price = Number(row?.item?.price) || 0;
    const qty = Number(row?.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const handleCheckout = () => {
    const order = OrderService.createOrder(cartItems);
    navigation.navigate('OrderSuccess', { order });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate('Menu')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <Text style={styles.summaryItems}>
              Items: {cartItems.length}
            </Text>

            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              ${Number(total).toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={handleCheckout}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryBtnText}>Place Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Text style={styles.secondaryBtnText}>Back to Cart</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    marginBottom: 16,
  },

  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 20,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 10,
  },

  summaryItems: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
  },

  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  totalValue: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
    marginTop: 4,
  },

  primaryBtn: {
    backgroundColor: '#3b1713',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },

  secondaryBtn: {
    backgroundColor: '#F7F7F8',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  secondaryBtnText: {
    color: '#111',
    fontWeight: '900',
    fontSize: 16,
  },

  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#444',
  },
});
