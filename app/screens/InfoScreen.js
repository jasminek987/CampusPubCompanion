import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PUB_INFO = {
  hours: [
    { day: 'Monday',    status: 'Closed' },
    { day: 'Tuesday',   status: '11:30 AM - 7:00 PM' },
    { day: 'Wednesday', status: '11:30 AM - 7:00 PM' },
    { day: 'Thursday',  status: '11:30 AM - 7:00 PM' },
    { day: 'Friday',    status: '11:30 AM - 7:00 PM' },
    { day: 'Saturday',  status: 'Closed' },
    { day: 'Sunday',    status: 'Closed' },
  ],
  address: '3333 University Way, Prince George, BC V2N 4Z9 NUSC Building 6',
  phone: '+1 (250) 960 6023',
  email: 'nugss-gm@unbc.ca',
  socials: [
    { platform: 'Instagram',     url: 'https://www.instagram.com/thirstymoosepub/?hl=en' },
    { platform: 'NUGSS Website', url: 'https://www.nugss.ca/the-thirsty-moose-pub' },
  ],
};

// Fix: was returning array with all days as one string
function getTodayName() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
}

// Fix: was capitalised OpenLink — wouldn't match JSX calls
function openLink(url) {
  Linking.openURL(url).catch(() => {});
}

// Fix: was SectionHeader(Title) instead of ({ title })
function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionAccent} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default function InfoScreen() {
  const navigation = useNavigation();
  const today = getTodayName();

  return (
    <View style={styles.container}>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Pub Info</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Hours */}
        <SectionHeader title="Hours" />
        <Card>
         
          {PUB_INFO.hours.map(({ day, status }) => {
            const isToday = day === today;
            const isClosed = status === 'Closed';
            return (
              <View
                key={day}
                style={[styles.hoursRow, isToday && styles.hoursRowToday]}
              >
                <Text style={[styles.hoursDay, isToday && styles.hoursDayToday]}>
                  {day}
                  {isToday && <Text style={styles.todayBadge}> · Today</Text>}
                </Text>
                <Text style={[styles.hoursTime, isToday && styles.hoursTimeToday, isClosed && styles.hoursTimeClosed]}>
                  {status}
                </Text>
              </View>
            );
          })}
        </Card>

        {/* Location */}
        <SectionHeader title="Location" />
        <Card>
          <Text style={styles.addressText}>{PUB_INFO.address}</Text>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              openLink(`https://maps.app.goo.gl/fQcXQCVJoQi42rWu7?api=1&query=${encodeURIComponent(PUB_INFO.address)}`)
            }
          >
            <Text style={styles.primaryButtonText}>Open in Maps</Text>
          </TouchableOpacity>
        </Card>

        {/* Contact */}
        <SectionHeader title="Contact" />
        <Card>
          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => openLink(`tel:${PUB_INFO.phone}`)}
          >
            <View style={styles.contactIconWrap}>
              <Text style={styles.contactIcon}>📞</Text>
            </View>
            <View>
              <Text style={styles.contactLabel}>Phone</Text>
              <Text style={styles.contactValue}>{PUB_INFO.phone}</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.contactRow}
            onPress={() => openLink(`mailto:${PUB_INFO.email}`)}
          >
            <View style={styles.contactIconWrap}>
              <Text style={styles.contactIcon}>✉️</Text>
            </View>
            <View>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>{PUB_INFO.email}</Text>
            </View>
          </TouchableOpacity>
        </Card>

        {/* Socials */}
        <SectionHeader title="Follow Us" />
       
        <View style={styles.socialsRow}>
          {PUB_INFO.socials.map(({ platform, url }) => (
            <TouchableOpacity
              key={platform}
              style={styles.socialButton}
              onPress={() => openLink(url)}
            >
              <Text style={styles.socialButtonText}>{platform}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>

    </View>
  );
}

const BROWN = '#3b1713';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F2',
  },
  backButton: {
    width: 70,
  },
  backText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '600',
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionAccent: {
    width: 4,
    height: 20,
    backgroundColor: BROWN,
    borderRadius: 2,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EBEBEB',
  },
  hoursRowToday: {
    backgroundColor: 'rgba(59,23,19,0.06)',
    marginHorizontal: -16,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  hoursDay: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
  },
  hoursDayToday: {
    color: BROWN,
    fontWeight: '700',
  },
  todayBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: BROWN,
  },
  hoursTime: {
    fontSize: 14,
    color: '#666',
  },
  hoursTimeToday: {
    color: BROWN,
    fontWeight: '600',
  },
  hoursTimeClosed: {
    color: '#999',
    fontStyle: 'italic',
  },
  addressText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    paddingVertical: 14,
  },
  primaryButton: {
    backgroundColor: BROWN,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 14,
    marginTop: 2,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  contactIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59,23,19,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  contactIcon: {
    fontSize: 18,
  },
  contactLabel: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    color: BROWN,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#EBEBEB',
    marginHorizontal: -16,
  },
  socialsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: BROWN,
  },
  socialButtonText: {
    color: BROWN,
    fontWeight: '800',
    fontSize: 15,
  },
  bottomPad: {
    height: 32,
  },
});