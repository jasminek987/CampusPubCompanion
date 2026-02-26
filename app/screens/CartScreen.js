import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useCartStore } from '../context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function CartScreen({ navigation }) {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const insets = useSafeAreaInsets();

  // ✅ Safe numeric conversion (prevents blank screen crashes)
  const total = cartItems.reduce((sum, row) => {
    const price = Number(row?.item?.price) || 0;
    const qty = Number(row?.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const renderRow = ({ item: row }) => {
    const price = Number(row?.item?.price) || 0;

    return (
      <View style={styles.card}>
        <View style={styles.rowTop}>
          <Text style={styles.itemName} numberOfLines={1}>
            {row?.item?.name ?? 'Item'}
          </Text>
          <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
        </View>

        <Text style={styles.qtyText}>Quantity: {row.quantity}</Text>

        <View style={styles.actionsRow}>
          <View style={styles.qtyControls}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(row.item.id)}
              style={styles.qtyBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </TouchableOpacity>

            <View style={styles.qtyPill}>
              <Text style={styles.qtyPillText}>{row.quantity}</Text>
            </View>

            <TouchableOpacity
              onPress={() => increaseQuantity(row.item.id)}
              style={styles.qtyBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => removeFromCart(row.item.id)}
            style={styles.removeBtn}
            activeOpacity={0.8}
          >
            <Text style={styles.removeBtnText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>

      {cartItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigation.navigate('Menu')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(row) => row.item.id.toString()}
            renderItem={renderRow}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Bottom Summary Bar */}
          <View style={styles.bottomBar}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${Number(total).toFixed(2)}</Text>
            </View>

            <View style={styles.bottomBtns}>
              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate('Menu')}
                activeOpacity={0.85}
              >
                <Text style={styles.secondaryBtnText}>Add Items</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => navigation.navigate('Checkout')}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F2F2',
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#111',
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 150, // space for bottom bar
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    flex: 1,
    marginRight: 10,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1F7A3A',
  },

  qtyText: {
    marginTop: 8,
    color: '#444',
    fontWeight: '600',
  },

  actionsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F7F7F8',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyBtnText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#111',
  },

  qtyPill: {
    minWidth: 44,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10, // replaces gap
  },

  qtyPillText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },

  removeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#FFF0F0',
    borderWidth: 1,
    borderColor: '#FFD6D6',
  },

  removeBtnText: {
    color: '#B00020',
    fontWeight: '900',
  },

  bottomBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },

  totalLabel: {
    color: '#666',
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
    marginTop: 2,
  },

  bottomBtns: {
    marginTop: 12,
    flexDirection: 'row',
  },

  primaryBtn: {
    width: '20%',
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
    flex: 1,
    backgroundColor: '#F7F7F8',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 10, // spacing between buttons
  },

  secondaryBtnText: {
    color: '#111',
    fontWeight: '900',
    fontSize: 16,
  },

  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },

  emptyText: {
    color: '#444',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
  },
});
