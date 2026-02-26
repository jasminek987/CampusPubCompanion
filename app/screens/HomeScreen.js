import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HERO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/28b658de-028f-445f-823d-965837db06e0/IMG_8683.JPG?format=2500w';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F2F2F2' }} edges={['top']}>
      {/* VERTICAL SCROLL (this is the missing part) */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: insets.bottom + 120, // extra space for bottom tab bar
        }}
      >
        {/* HERO SECTION */}
        <ImageBackground
          source={{ uri: HERO_URI }}
          style={{ width: '100%', height: Math.min(height * 0.38, 300) }}
          resizeMode="cover"
        >
          <View style={styles.overlay} />

          {/* Top Bar */}
          <View style={[styles.topBar, { top: insets.top + 8 }]}>
            <Text style={styles.userText}>Hey, User</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.cartButton}
            >
              <Text style={styles.cartText}>Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Title Block */}
          <View style={styles.titleBlock}>
            <Text style={styles.mainTitle}>The Thirsty Moose Pub</Text>

            <Text style={styles.subTitle}>
              Come in and join us on your study break or for some evening entertainment.
            </Text>
          </View>
        </ImageBackground>

        {/* SPECIALS CARD SECTION (HORIZONTAL ONLY) */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          style={{ marginTop: 16 }}
        >
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Specials Today</Text>
            <Text style={styles.cardSub}>Discounted deals pulled from the menu.</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Specials')}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>View Specials</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pub Info</Text>
            <Text style={styles.cardSub}>Hours, location, contact, and socials.</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Info')}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>View Info</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  topBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },

  cartButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },

  cartText: {
    color: '#007AFF',
    fontWeight: '800',
  },

  titleBlock: {
    position: 'absolute',
    right: 18,
    bottom: 28,
    width: width * 0.7,
    alignItems: 'flex-end',
  },

  mainTitle: {
    color: 'white',
    fontSize: Math.min(width * 0.09, 40), // cap so it doesn’t explode on big screens
    fontWeight: '900',
    textAlign: 'right',
  },

  subTitle: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.9)',
    fontSize: Math.min(width * 0.04, 16),
    textAlign: 'right',
  },

  card: {
    width: width - 32, // exact “one full page” width for pagingEnabled
    height: Math.min(height * 0.28, 240),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    padding: 18,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  cardSub: {
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },

  primaryButton: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
};