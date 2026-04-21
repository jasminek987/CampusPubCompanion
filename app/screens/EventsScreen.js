import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { getEvents } from '../../services/DataService';

const LOGO_URI = 'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [openId, setOpenId] = useState(null);

  const getEventDateTime = (date, time) => {
    if (!date) return null;

    const now = new Date();

    const monthMap = {
      january: 0, jan: 0,
      february: 1, feb: 1,
      march: 2, mar: 2,
      april: 3, apr: 3,
      may: 4,
      june: 5, jun: 5,
      july: 6, jul: 6,
      august: 7, aug: 7,
      september: 8, sep: 8, sept: 8,
      october: 9, oct: 9,
      november: 10, nov: 10,
      december: 11, dec: 11,
    };

    const cleanDate = String(date).trim().replace(',', '');
    const parts = cleanDate.split(/\s+/);

    let month;
    let day;
    let year;

    if (parts.length >= 2) {
      month = monthMap[parts[0].toLowerCase()];
      day = parseInt(parts[1], 10);
      year = parts[2] ? parseInt(parts[2], 10) : now.getFullYear();
    }

    if (month === undefined || isNaN(day)) {
      const fallback = new Date(`${date} ${time || ''}`);
      return isNaN(fallback.getTime()) ? null : fallback;
    }

    let hours = 0;
    let minutes = 0;

    if (time) {
      const cleanTime = String(time).trim().toLowerCase();
      const match = cleanTime.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);

      if (match) {
        hours = parseInt(match[1], 10);
        minutes = match[2] ? parseInt(match[2], 10) : 0;
        const meridian = match[3];

        if (meridian === 'pm' && hours !== 12) hours += 12;
        if (meridian === 'am' && hours === 12) hours = 0;
      }
    }

    return new Date(year, month, day, hours, minutes, 0, 0);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEvents();
        const now = new Date();

        const sortedEvents = [...data].sort((a, b) => {
          const dateA = getEventDateTime(a.date, a.time);
          const dateB = getEventDateTime(b.date, b.time);

          const isPastA = dateA ? dateA < now : false;
          const isPastB = dateB ? dateB < now : false;

          if (isPastA !== isPastB) {
            return isPastA ? 1 : -1;
          }

          if (dateA && dateB) {
            return dateA - dateB;
          }

          return 0;
        });

        setEvents(sortedEvents);
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

  const now = new Date();

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
          const eventDateTime = getEventDateTime(e.date, e.time);
          const isPast = eventDateTime ? eventDateTime < now : false;

          return (
            <TouchableOpacity
              key={e.id}
              activeOpacity={0.85}
              onPress={() => setOpenId(isOpen ? null : e.id)}
              style={[styles.card, isPast ? styles.pastCard : styles.upcomingCard]}
            >
              <View style={styles.cardInner}>
                <View style={styles.rowTop}>
                  <Text
                    style={[styles.eventName, isPast && styles.pastText]}
                    numberOfLines={1}
                  >
                    {e.name}
                  </Text>

                  <View style={[styles.pill, isPast ? styles.pastPill : styles.upcomingPill]}>
                    <Text style={[styles.pillText, !isPast && styles.upcomingPillText]}>
                      {isOpen ? 'Hide' : 'Details'}
                    </Text>
                  </View>
                </View>

                <Text style={[styles.meta, isPast && styles.pastText]}>
                  {e.date} • {e.time}
                </Text>

                {isOpen ? (
                  <Text style={[styles.desc, isPast && styles.pastText]}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  emptyWrap: { flex: 1, backgroundColor: 'white', padding: 16 },

  header: { paddingTop: 18, paddingBottom: 12, paddingHorizontal: 16 },
  headerCenter: { alignItems: 'center' },

  logo: {
    width: 120,
    height: 120,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff'
  },

  title: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '800',
    color: '#111',
    letterSpacing: 0.3
  },

  backButton: { marginBottom: 10, marginTop: 10, marginLeft: 16 },
  backText: { fontSize: 16, color: '#000000', fontWeight: '600' },

  subtitle: { marginTop: 4, color: '#555' },
  listContent: { paddingHorizontal: 16, paddingBottom: 24 },

  card: {
    marginBottom: 12,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1
  },

  upcomingCard: {
    backgroundColor: '#ffffff',
    borderColor: '#cfcfcf',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1
  },

  pastCard: {
    backgroundColor: '#f5f5f7',
    borderColor: '#e6e6e9',
    opacity: 0.75
  },

  cardInner: { padding: 14 },

  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  eventName: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    color: '#111'
  },

  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    marginLeft: 12
  },

  upcomingPill: {
    backgroundColor: '#f8f8f8',
    borderColor: '#bdbdbd'
  },

  pastPill: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd'
  },

  pillText: {
    color: '#111',
    fontWeight: '800'
  },

  upcomingPillText: {
    color: '#000'
  },

  meta: {
    marginTop: 8,
    color: '#555'
  },

  desc: {
    marginTop: 10,
    color: '#444',
    lineHeight: 18
  },

  pastText: {
    color: '#777'
  }
});