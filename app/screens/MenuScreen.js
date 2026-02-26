import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import DataService from '../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function MenuScreen({ navigation }) {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const data = DataService.getMenu();
    const formatted = data.map((cat) => ({
      title: cat.category,
      data: cat.items,
    }));
    setSections(formatted);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={{ uri: LOGO_URI }} style={styles.logo} resizeMode="cover" />
          <Text style={styles.title}>Thirsty Moose Menu</Text>
          <Text style={styles.subtitle}>Tap an item to view details</Text>
        </View>
      </View>

      <SectionList
        sections={sections}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionUnderline} />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetail', { item })}
            activeOpacity={0.85}
            style={styles.card}
          >
            <View style={styles.cardInner}>
              <View style={styles.rowTop}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.pricePill}>
                  <Text style={styles.priceText}>${Number(item.price).toFixed(2)}</Text>
                </View>
              </View>

              {item.description ? (
                <Text style={styles.itemDesc} numberOfLines={2}>
                  {item.description}
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { paddingTop: 28, paddingBottom: 12, paddingHorizontal: 16 },
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
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  sectionHeader: { marginTop: 14, marginBottom: 8 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionUnderline: {
    height: 2,
    width: 60,
    marginTop: 6,
    backgroundColor: '#111',
    borderRadius: 2,
  },
  card: {
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#f5f5f7',
    borderWidth: 1,
    borderColor: '#e6e6e9',
  },
  cardInner: { padding: 14 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between' },
  itemName: { flex: 1, fontSize: 17, fontWeight: '800', color: '#111' },
  pricePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 12,
  },
  priceText: { color: '#111', fontWeight: '800' },
  itemDesc: { marginTop: 8, color: '#555', lineHeight: 18 },
});