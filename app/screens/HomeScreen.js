import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

// ✅ Direct working image URL (NOT Bing link)
const HERO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/28b658de-028f-445f-823d-965837db06e0/IMG_8683.JPG?format=2500w';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
      
      {/* HERO SECTION */}
      <ImageBackground
        source={{ uri: HERO_URI }}
        style={{ width: '100%', height: 320 }}
        resizeMode="cover"
      >
        {/* Dark Overlay */}
        <View style={styles.overlay} />

        {/* Top Bar */}
        <View style={styles.topBar}>
  <Text style={styles.userText}>Hey, User</Text>

  <View style={styles.rightButtons}>
    
    <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      style={styles.cartButton}
    >
      <Text style={styles.cartText}>Login</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.cartButton}
    >
      <Text style={styles.cartText}>Cart</Text>
    </TouchableOpacity>

  </View>
</View>

        {/* Title Block (Right Side like website) */}
        <View style={styles.titleBlock}>
          <Text style={styles.mainTitle}>
            The Thirsty Moose Pub
          </Text>

          <Text style={styles.subTitle}>
            Come in and join us on your study break or for some evening entertainment.
          </Text>
        </View>
      </ImageBackground>

      {/* SPECIALS CARD SECTION */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        style={{ marginTop: 16 }}
      >
        {/* Specials Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Specials Today</Text> 

          <Text style={styles.cardSub}>
            Discounted deals pulled from the menu.
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Specials')}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              View Specials
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pub Info</Text>

          <Text style={styles.cardSub}>
            Hours, location, contact, and socials.
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Info')}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              View Info
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
    top: 20,
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
    color: '#000000',
    fontWeight: '800',
  },

  titleBlock: {
    position: 'absolute',
    right: 18,
    bottom: 28,
    width: '70%',
    alignItems: 'flex-end',
  },

  mainTitle: {
    color: 'white',
    fontSize: 44,
    fontWeight: '900',
    textAlign: 'right',
  },

  subTitle: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    textAlign: 'right',
  },

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
    backgroundColor: '#3b1713',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  } ,

  headerButton: {
  backgroundColor: 'rgba(255,255,255,0.95)',
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderRadius: 999,
  marginLeft: 10,
},

headerButtonText: {
  color: '#000000',
  fontWeight: '800',
},

  LoginButton: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginRight: 10,
    
  },

  loginText: {
    color: '#000000',
    fontWeight: '800',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
};
