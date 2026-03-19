import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCartStore } from '../context/CartContext';

export default function FavoritesScreen({ navigation }) {
  const { favorites, toggleFavorite } = useCartStore();

  const renderItem = ({ item }) => {
    const price = Number(item.price) || 0;
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('ItemDetail', { item })}
      >
        <View style={styles.cardRow}>
          <View style={styles.cardText}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${price.toFixed(2)}</Text>
            {item.description ? (
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}
          </View>

          <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.heartBtn} activeOpacity={0.8}>
            <Ionicons name="heart" size={24} color="#c0392b" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbutton} activeOpacity={0.85}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Favorites</Text>
        <View style={styles.Spacer} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="heart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Menu')}
          >
            <Text style={styles.primaryBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  backbutton : {
    marginLeft: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  
    backText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },

  Spacer: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    opacity: 0,
  },

  screenTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },
  listContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  heartBtn: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#111',
    marginTop: 16,
    marginBottom: 8,
  },
  primaryBtn: {
    backgroundColor: '#3b1713',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
});