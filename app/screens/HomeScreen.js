
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const HERO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/28b658de-028f-445f-823d-965837db06e0/IMG_8683.JPG?format=2500w';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: HERO_URI }} style={styles.hero} resizeMode="cover">
        <View style={styles.overlay} />

        <View style={[styles.topBar, { top: insets.top + 8 }]}>
          <Text style={styles.userText}>Hey, User</Text>

          <View style={styles.rightButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.headerButton}
            >
              <Text style={styles.headerButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.headerButton}
            >
              <Text style={styles.headerButtonText}>Cart</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.mainTitle}>The Thirsty Moose Pub</Text>
          <Text style={styles.subTitle}>
            Come in and join us on your study break or for some evening entertainment.
          </Text>
        </View>
      </ImageBackground>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContent}
        style={styles.cardsWrap}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },

  hero: { width: '100%', height: 320 },

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

  userText: { color: 'white', fontSize: 18, fontWeight: '700' },

  rightButtons: { flexDirection: 'row', alignItems: 'center' },

  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginLeft: 10,
  },

  headerButtonText: { color: '#000000', fontWeight: '800' },

  titleBlock: {
    position: 'absolute',
    right: 18,
    bottom: 28,
    width: '70%',
    alignItems: 'flex-end',
  },

  mainTitle: { color: 'white', fontSize: 44, fontWeight: '900', textAlign: 'right' },

  subTitle: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'right',
  },

  cardsWrap: { marginTop: 16 },
  cardsContent: { paddingHorizontal: 16 },

  card: {
    width: screenWidth - 32,
    height: 240,
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

  cardTitle: { fontSize: 20, fontWeight: '800', color: '#111' },

  cardSub: { marginTop: 8, color: '#666', textAlign: 'center' },

  primaryButton: {
    marginTop: 16,
    backgroundColor: '#3b1713',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  primaryButtonText: { color: '#FFFFFF', fontWeight: '700' },
});