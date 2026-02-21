import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import DataService from '../services/DataService';

export default function MenuScreen({ navigation }) {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const data = DataService.getMenu();
    setMenu(data);
  }, []);
 
  console.log('Menu data:', menu);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItemDetail', { item })}
            style={{ marginBottom: 16 }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              {item.name}
            </Text>
            <Text>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}