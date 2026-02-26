import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import DataService from '../services/DataService';


export default function EventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const data = DataService.getEvents();
    setEvents(data);
  }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: '#111' }}>No events scheduled.</Text>
      </View>
    );
  }

  

