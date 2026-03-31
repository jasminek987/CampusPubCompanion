import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function LoginButton({ onPress, disabled = false }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={() => {
        console.log('LoginButton tapped');
        if (!disabled && onPress) {
          onPress();
        }
      }}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>
        {disabled ? 'Logging In...' : 'Login'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#3B1713',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});