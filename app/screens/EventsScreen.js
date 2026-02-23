import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import DataService from '../services/DataService';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const data = DataService.getEvents();
    setEvents(data);
  }, []);

  if (!events.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
        <Text>No events scheduled.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
            Upcoming Events
          </Text>
          <Text style={{ marginTop: 4, color: '#555' }}>
            Tap an event to see details
          </Text>
        </View>
      </View>

      {/* Scrollable cards */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {events.map((e) => {
          const isOpen = openId === e.id;

          return (
            <TouchableOpacity
              key={e.id}
              activeOpacity={0.85}
              onPress={() => setOpenId(isOpen ? null : e.id)}
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
                    {e.name}
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
                      {isOpen ? 'Hide' : 'Details'}
                    </Text>
                  </View>
                </View>

                <Text style={{ marginTop: 8, color: '#555' }}>
                  {e.date} • {e.time}
                </Text>

                {isOpen ? (
                  <Text style={{ marginTop: 10, color: '#444', lineHeight: 18 }}>
                    {e.description}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}