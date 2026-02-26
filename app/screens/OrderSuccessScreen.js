import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrderSuccessScreen({ route, navigation }) {
  const { order } = route.params;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      
      {/* Success Card */}
      <View style={styles.card}>
        
        <Text style={styles.checkmark}>✓</Text>

        <Text style={styles.title}>
          Order #{order.orderNumber}
        </Text>

        <Text style={styles.subtitle}>
          Placed Successfully!
        </Text>

        <Text style={styles.message}>
          Thank you for your order.  
          We’re preparing it now!
        </Text>

      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() =>
          navigation.navigate('MainTabs', { screen: 'Home' })
        }
      >
        <Text style={styles.homeButtonText}>Back to Home</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    marginBottom: 30,
  },

  checkmark: {
    fontSize: 50,
    color: '#2e7d32',
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 18,
    color: '#2e7d32',
    marginTop: 5,
    fontWeight: '600',
  },

  message: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 22,
  },

  homeButton: {
    backgroundColor: '#5a1e14', // your dark maroon color
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
