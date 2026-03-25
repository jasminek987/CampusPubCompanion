import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { getEvents } from '../../services/DataService';

const LOGO_URI = 'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events', err);
      }
    }
    fetchData();
  }, []);

  if (!events.length) {
    return (
      <View style={styles.emptyWrap}>
        <Text>No events scheduled.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton} activeOpacity={0.85}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={{ uri: LOGO_URI }} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Upcoming Events</Text>
          <Text style={styles.subtitle}>Tap an event to see details</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.listContent}>
        {events.map((e) => {
          const isOpen = openId === e.id;
          return (
            <TouchableOpacity key={e.id} activeOpacity={0.85} onPress={() => setOpenId(isOpen ? null : e.id)} style={styles.card}>
              <View style={styles.cardInner}>
                <View style={styles.rowTop}>
                  <Text style={styles.eventName} numberOfLines={1}>{e.name}</Text>
                  <View style={styles.pill}>
                    <Text style={styles.pillText}>{isOpen ? 'Hide' : 'Details'}</Text>
                  </View>
                </View>
                <Text style={styles.meta}>{e.date} • {e.time}</Text>
                {isOpen ? <Text style={styles.desc}>{e.description}</Text> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  emptyWrap: { flex: 1, backgroundColor: 'white', padding: 16 },
  header: { paddingTop: 18, paddingBottom: 12, paddingHorizontal: 16 },
  headerCenter: { alignItems: 'center' },
  logo: { width: 120, height: 120, borderRadius: 200, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  title: { marginTop: 10, fontSize: 22, fontWeight: '800', color: '#111', letterSpacing: 0.3 },
  backButton: { marginBottom: 10, marginTop: 10, marginLeft: 16 },
  backText: { fontSize: 16, color: '#000000', fontWeight: '600' },
  subtitle: { marginTop: 4, color: '#555' },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },
  card: { marginBottom: 12, borderRadius: 14, overflow: 'hidden', backgroundColor: '#f5f5f7', borderWidth: 1, borderColor: '#e6e6e9' },
  cardInner: { padding: 14 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventName: { flex: 1, fontSize: 17, fontWeight: '800', color: '#111' },
  pill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: 'white', borderWidth: 1, borderColor: '#ddd', marginLeft: 12 },
  pillText: { color: '#111', fontWeight: '800' },
  meta: { marginTop: 8, color: '#555' },
  desc: { marginTop: 10, color: '#444', lineHeight: 18 },
});
