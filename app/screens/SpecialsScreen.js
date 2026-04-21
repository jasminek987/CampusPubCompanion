import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getSpecials } from '../../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

// Days the pub is OPEN (matches Info screen hours)
const OPEN_DAYS = ['Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Sort order for open days (Tue → Fri)
const DAY_ORDER = {
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
};

export default function SpecialsScreen() {
  const navigation = useNavigation();
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSpecials();

        // Filter out specials for closed days, then sort Tue → Fri
        const filtered = (data || [])
          .filter((s) => OPEN_DAYS.includes(s.day))
          .sort(
            (a, b) =>
              (DAY_ORDER[a.day] ?? 99) - (DAY_ORDER[b.day] ?? 99)
          );

        setSpecials(filtered);
      } catch (err) {
        console.error('Failed to load specials', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Convert a special into the shape ItemDetailScreen expects
  const handleOpenDetail = (special) => {
    const itemForDetail = {
      id: special.id,
      name: `${special.day}: ${special.name}`,
      price: Number(special.specialPrice) || 0,
      description: special.description || '',
    };
    navigation.navigate('ItemDetail', { item: itemForDetail });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Image source={{ uri: LOGO_URI }} style={styles.logo} resizeMode="cover" />
      <Text style={styles.title}>Weekly Specials</Text>
      <Text style={styles.subtitle}>
        Limited-time deals (discounted from menu)
      </Text>
      <View style={styles.divider} />
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyCard}>
      <Ionicons name="pricetag-outline" size={28} color="#777" />
      <Text style={styles.emptyText}>No specials available.</Text>
      <Text style={styles.emptySub}>Check back soon!</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    const original = Number(item.originalPrice) || 0;
    const special = Number(item.specialPrice) || 0;
    const savings = original - special;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => handleOpenDetail(item)}
      >
        <View style={styles.rowTop}>
          <View style={styles.nameWrap}>
            <Text style={styles.dayLabel}>{item.day}</Text>
            <Text style={styles.itemName} numberOfLines={2}>
              {item.name}
            </Text>
          </View>

          <View style={styles.priceBlock}>
            <View style={styles.pricePill}>
              <Text style={styles.priceText}>${special.toFixed(2)}</Text>
            </View>
            {original > special ? (
              <Text style={styles.regularText}>${original.toFixed(2)}</Text>
            ) : null}
          </View>
        </View>

        {item.description ? (
          <Text style={styles.desc}>{item.description}</Text>
        ) : null}

        <View style={styles.cardFooter}>
          {savings > 0 ? (
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>
                Save ${savings.toFixed(2)}
              </Text>
            </View>
          ) : (
            <View />
          )}
          <View style={styles.detailLink}>
            <Text style={styles.detailLinkText}>View details</Text>
            <Ionicons name="chevron-forward" size={16} color="#3b1713" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Bar — matches ItemDetail */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.85}
        >
          <Text style={styles.btnText}>← Back</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#3b1713" />
        </View>
      ) : (
        <FlatList
          data={specials}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
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

  // Top bar (matches ItemDetailScreen)
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  btnText: {
    color: '#111',
    fontWeight: '900',
  },

  // Header
  header: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 16,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 12,
    fontSize: 26,
    fontWeight: '900',
    color: '#111',
    letterSpacing: 0.3,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  divider: {
    marginTop: 14,
    height: 1,
    width: '100%',
    backgroundColor: '#E5E5EA',
  },

  // List
  listContent: {
    paddingBottom: 30,
  },

  // Card (matches ItemDetail card style)
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 12,
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameWrap: {
    flex: 1,
    paddingRight: 12,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '900',
    color: '#3b1713',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111',
  },

  // Price area
  priceBlock: {
    alignItems: 'flex-end',
  },
  pricePill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#3b1713',
  },
  priceText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
  regularText: {
    marginTop: 4,
    color: '#999',
    fontSize: 13,
    textDecorationLine: 'line-through',
  },

  // Description
  desc: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },

  // Footer
  cardFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  saveBadge: {
    backgroundColor: '#FDECEA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#F5C6C2',
  },
  saveBadgeText: {
    color: '#c0392b',
    fontWeight: '900',
    fontSize: 12,
  },
  detailLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLinkText: {
    color: '#3b1713',
    fontWeight: '900',
    fontSize: 13,
    marginRight: 2,
  },

  // Loading
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Empty state
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    alignItems: 'center',
    marginTop: 8,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '900',
    color: '#111',
  },
  emptySub: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});