import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>

      {/* Top Navigation Bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingTop: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600' }}>
          Hey, User
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={{ fontSize: 16, color: '#007AFF' }}>
            Cart
          </Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Specials Section */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ marginTop: 25 }}
      >

        {/* Special Card */}
        <View
          style={{
            width: screenWidth - 32,
            height: 300,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
            elevation: 4, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate('Specials')}
            style={{
              backgroundColor: '#007AFF',
              paddingVertical: 12,
              paddingHorizontal: 30,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>
              Specials Today
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, color: '#007AFF' }}>
            Tap to explore today’s offers
          </Text>
        </View>

        {/* Second Card */}
        <View
          style={{
            width: screenWidth - 32,
            height: 300,
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: '500' }}>
            More Specials
          </Text>
        </View>

      </ScrollView>

    </View>
  );
}