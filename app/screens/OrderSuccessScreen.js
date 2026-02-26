import React from 'react';
import { View, Text } from 'react-native';

export default function OrderSuccessScreen({ route, navigation }) {

  const { order } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Order #{order.orderNumber} Placed Successfully!
      </Text>

      <Text style={{ marginTop: 10 }}>
        Thank you for your order!
      </Text>

      <Text style={{ marginTop: 20, color: 'blue' }}
        onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })} >
      Back to Home
      </Text>

    </View>

  );
}