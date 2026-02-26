import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DataService from '../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function SpecialsScreen() {
  const navigation = useNavigation(); // ✅ you need this
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
        {/* Header */}
        <View style={{ paddingTop: 18, paddingBottom: 12, paddingHorizontal: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: LOGO_URI }}
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                borderWidth: 1,
                borderColor: '#ddd',
                backgroundColor: '#fff',
              }}
              resizeMode="cover"
            />

            <Text
              style={{
                marginTop: 10,
                fontSize: 22,
                fontWeight: '800',
                color: '#111',
                letterSpacing: 0.3,
              }}
            >
              Today’s Specials
            </Text>

            {!specials.length ? (
              <Text style={{ marginTop: 8, color: '#555' }}>No specials today.</Text>
            ) : (
              <Text style={{ marginTop: 4, color: '#555' }}>
                Limited-time deals (discounted from menu)
              </Text>
            )}
          </View>
        </View>

        {/* List */}
        {specials.length ? (
          <FlatList
            data={specials}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            renderItem={({ item }) => (
              <View
                style={{
                  marginBottom: 12,
                  borderRadius: 14,
                  overflow: 'hidden',
                  backgroundColor: '#f5f5f7',
                  borderWidth: 1,
                  borderColor: '#e6e6e9',
                }}
              >
                <View style={{ padding: 14 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 17,
                        fontWeight: '800',
                        color: '#111',
                      }}
                      numberOfLines={1}
                    >
                      {item.day}: {item.name}
                    </Text>

                    <View
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 999,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: '#ddd',
                      }}
                    >
                      <Text style={{ color: '#111', fontWeight: '800' }}>
                        ${Number(item.specialPrice).toFixed(2)}
                      </Text>
                    </View>
                  </View>

                  <Text style={{ marginTop: 6, color: '#666' }}>
                    Regular: ${Number(item.originalPrice).toFixed(2)}
                  </Text>

                  {item.description ? (
                    <Text style={{ marginTop: 10, color: '#444', lineHeight: 18 }}>
                      {item.description}
                    </Text>
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
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  backText: {
    fontSize: 16,
    color: '#000811',
    fontWeight: '600',
  },
});