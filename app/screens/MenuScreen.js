import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, Image } from 'react-native';
import DataService from '../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function MenuScreen({ navigation }) {
  const [sections, setSections] = useState([]);
  
  useEffect(() => {
    const data = DataService.getMenu(); // [{category, items}]
    const formatted = data.map((cat) => ({
      title: cat.category,
      data: cat.items,
    }));
    setSections(formatted);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View style={{ paddingTop: 28, paddingBottom: 12, paddingHorizontal: 16 }}>
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
            Thirsty Moose Menu
          </Text>
          <Text style={{ marginTop: 4, color: '#555' }}>
            Tap an item to view details
          </Text>
        </View>
      </View>

      {/* List */}
      <SectionList
        sections={sections}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        keyExtractor={(item) => item.id.toString()}
        renderSectionHeader={({ section }) => (
          <View style={{ marginTop: 14, marginBottom: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '800',
                color: '#111',
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {section.title}
            </Text>
            <View
              style={{
                height: 2,
                width: 60,
                marginTop: 6,
                backgroundColor: '#111',
                borderRadius: 2,
              }}
            />
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetail', { item })}
            activeOpacity={0.85}
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
                  {item.name}
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
                    ${Number(item.price).toFixed(2)}
                  </Text>
                </View>
              </View>

              {item.description ? (
                <Text
                  style={{
                    marginTop: 8,
                    color: '#555',
                    lineHeight: 18,
                  }}
                  numberOfLines={2}
                >
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