import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCartStore } from '../context/CartContext';

export default function ItemDetailScreen({ route, navigation }) {
  const { item } = route.params || {};
  const { addToCart } = useCartStore();

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No item found</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.secondaryBtn}>
          <Text style={styles.secondaryBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const price = Number(item.price) || 0;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.pillBtn} activeOpacity={0.85}>
          <Text style={styles.pillText}>← Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.pillBtn} activeOpacity={0.85}>
          <Text style={styles.pillText}>Cart</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>

          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : (
            <Text style={styles.descriptionMuted}>No description available.</Text>
          )}
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.9}
          onPress={() => {
            addToCart(item);
            console.log('ADDED:', item.name);
            navigation.navigate('Cart');
          }}
        >
          <Text style={styles.primaryBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryBtnText}>Back to Menu</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginBottom: 12,
  },

  pillBtn: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  pillText: {
    color: '#111',
    fontWeight: '900',
  },

  content: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  name: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
  },

  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '900',
    color: '#000000',
  },

  description: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },

  descriptionMuted: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#777',
    fontStyle: 'italic',
  },

  primaryBtn: {
    marginTop: 14,
    backgroundColor: '#3b1713',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  primaryBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },

  secondaryBtn: {
    marginTop: 10,
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

  errorText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    marginBottom: 12,
  },
});
