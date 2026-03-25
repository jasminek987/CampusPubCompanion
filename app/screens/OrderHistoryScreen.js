import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getOrders } from '../../services/OrderService';

export default function OrderHistoryScreen({ navigation }) {
  const [orders, setOrders] = useState([]);
  const userId = 'testUser1';

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders(userId);
        setOrders(data);
      } catch (error) {
        console.log('Error loading orders:', error);
      }
    };

    loadOrders();
  }, []);

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.85}
    onPress={() => navigation.navigate('OrderDetail', { order: item })} >
    <Text style={styles.orderTitle}>Order #{item.orderNumber}</Text>

    <Text style={styles.meta}>Status: {item.status}</Text>
    <Text style={styles.meta}>
      Total: ${Number(item.total || 0).toFixed(2)}
    </Text>

    <Text style={styles.meta}>
      Date: {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'N/A'}
    </Text>

    <Text style={styles.itemsHeading}>Items:</Text>

    {item.items && item.items.map((food, index) => (
      <View key={index} style={styles.itemRow}>
        <Text style={styles.itemText}>
          {food.name} x{food.quantity}
        </Text>
        <Text style={styles.itemText}>
          ${Number(food.price || 0).toFixed(2)}
        </Text>
      </View>
    ))}
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Order History</Text>
        <View style={{ width: 50 }} />
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>No orders yet</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 16,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 6,
    color: '#111',
  },
  meta: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
});