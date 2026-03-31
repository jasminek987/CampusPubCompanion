import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CreateAccountButton({ onPress, disabled = false }) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('CreateAccountButton tapped');
        if (onPress) onPress();
      }}
      style={[styles.button, disabled && styles.disabledButton]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>
        {disabled ? 'Creating Account...' : 'Create Account'}
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