
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DataService from '../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function SpecialsScreen() {
  const navigation = useNavigation();
  const [specials, setSpecials] = useState([]);

  useEffect(() => {
    const data = DataService.getSpecials();
    setSpecials(data);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerCenter}>
            <Image source={{ uri: LOGO_URI }} style={styles.logo} resizeMode="cover" />

            <Text style={styles.title}>Today’s Specials</Text>

            {!specials.length ? (
              <Text style={styles.noSpecials}>No specials today.</Text>
            ) : (
              <Text style={styles.subtitle}>Limited-time deals (discounted from menu)</Text>
            )}
          </View>
        </View>

        {specials.length ? (
          <FlatList
            data={specials}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardInner}>
                  <View style={styles.rowTop}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.day}: {item.name}
                    </Text>

                    <View style={styles.pricePill}>
                      <Text style={styles.priceText}>
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
              </View>
            )}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
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
  cardInner: { padding: 14 },

  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

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

  regularText: { marginTop: 6, color: '#666' },
  desc: { marginTop: 10, color: '#444', lineHeight: 18 },
});