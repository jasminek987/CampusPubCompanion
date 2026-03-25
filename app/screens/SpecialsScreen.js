import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DataService from '../../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TODAY = DAYS[new Date().getDay()];

export default function SpecialsScreen() {
  const navigation = useNavigation();
  const [specials, setSpecials] = useState([]);

useEffect(() => {
  const data = DataService.getSpecials();
  const filtered = data.filter(
    (item) => !['Saturday', 'Sunday', 'Monday'].includes(item.day?.trim())
  );
  setSpecials(filtered);
}, []);

  const isToday = (item) =>
    item.day && item.day.trim().toLowerCase() === TODAY.toLowerCase();

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Image source={{ uri: LOGO_URI }} style={styles.logo} resizeMode="cover" />
            <Text style={styles.title}>Today's Specials</Text>
            {!specials.length ? (
              <Text style={styles.noSpecials}>No specials today.</Text>
            ) : (
              <Text style={styles.subtitle}>Tap a special to view details</Text>
            )}
          </View>
        </View>

        {specials.length ? (
          <FlatList
            data={specials}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const today = isToday(item);
              return (
                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[styles.card, today && styles.cardHighlighted]}
                  onPress={() =>
                    navigation.navigate('ItemDetail', {
                      item: {
                        ...item,
                        price: item.specialPrice,
                        description: item.description
                          ? `${item.description}\n\nRegular price: $${Number(item.originalPrice).toFixed(2)}`
                          : `Regular price: $${Number(item.originalPrice).toFixed(2)}`,
                      },
                    })
                  }
                >
                  <View style={styles.cardInner}>
                    {today && (
                      <View style={styles.todayBadge}>
                        <Text style={styles.todayBadgeText}>Today</Text>
                      </View>
                    )}
                    <View style={styles.rowTop}>
                      <Text
                        style={[styles.itemName, today && styles.itemNameHighlighted]}
                        numberOfLines={1}
                      >
                        {item.day}: {item.name}
                      </Text>
                      <View style={[styles.pricePill, today && styles.pricePillHighlighted]}>
                        <Text style={[styles.priceText, today && styles.priceTextHighlighted]}>
                          ${Number(item.specialPrice).toFixed(2)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.regularText}>
                      Regular: ${Number(item.originalPrice).toFixed(2)}
                    </Text>
                    {item.description ? (
                      <Text style={styles.desc}>{item.description}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  backButton: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 },
  backText: { fontSize: 16, color: '#01070e', fontWeight: '600' },
  header: { paddingTop: 18, paddingBottom: 12, paddingHorizontal: 16 },
  headerCenter: { alignItems: 'center' },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    letterSpacing: 0.3,
  },
  subtitle: { marginTop: 4, color: '#555' },
  noSpecials: { marginTop: 8, color: '#555' },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  card: {
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f5f5f7',
    borderWidth: 1,
    borderColor: '#e6e6e9',
  },
  cardHighlighted: {
    backgroundColor: '#3b1313',
    borderColor: '#3b1713',
  },
  cardInner: { padding: 14 },
  todayBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginBottom: 8,
  },
  todayBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: { flex: 1, fontSize: 17, fontWeight: '800', color: '#111' },
  itemNameHighlighted: { color: '#fff' },
  pricePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 12,
  },
  pricePillHighlighted: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  priceText: { color: '#111', fontWeight: '800' },
  priceTextHighlighted: { color: '#fff' },
  regularText: { marginTop: 6, color: '#666' },
  desc: { marginTop: 10, color: '#444', lineHeight: 18 },
});