import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useCartStore } from '../context/CartContext';

export default function OrderDetailScreen({ route, navigation }) {
  const { order } = route.params;
  const { addOrderToCart } = useCartStore();

  const formattedDate = order.createdAt?.toDate
    ? order.createdAt.toDate().toLocaleString()
    : 'N/A';

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order #{order.orderNumber}</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.status}>Status: {order.status}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Order</Text>

          {order.items && order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Quantity: {item.quantity}</Text>
              </View>
              <Text style={styles.itemPrice}>
                ${Number(item.price || 0).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.totalText}>
            Total: ${Number(order.total || 0).toFixed(2)}
          </Text>
        </View>

    <TouchableOpacity
    style={styles.button}
    onPress={() => {
        console.log("Order Again pressed");
        console.log("order items:", order.items);
        addOrderToCart(order.items);
        navigation.navigate('Cart');
    }}>
    <Text style={styles.buttonText}>Order Again</Text>
    </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },
  content: {
    padding: 16,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  status: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1F7A3A',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemLeft: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
  },
  itemQty: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111',
  },
  totalText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },
  button: {
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '900',
  },
});