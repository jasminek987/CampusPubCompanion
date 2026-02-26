import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useEmailStore } from '../context/EmailContext';
import LoginButton from '../components/LoginButton';
import CreateAccountButton from '../components/CreateAccountButton';

export default function LoginScreen() {
  <TouchableOpacity
  onPress={() => navigation.goBack()}
  style={styles.backButton}
>
  <Text style={styles.backText}>← Back</Text>
</TouchableOpacity>
  const navigation = useNavigation();
  const { setEmail } = useEmailStore();

  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0;
  }, [email, password]);

  const validate = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setEmail(email.trim());
    Alert.alert('Welcome!', 'You are signed in now.');

    navigation.replace('MainTabs');

    setEmailInput('');
    setPassword('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmailInput}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <LoginButton onPress={handleLogin} disabled={!canSubmit} />

        <Text style={styles.label}>Don't have an account?</Text>
        <CreateAccountButton onPress={() => navigation.navigate('Registration')} />

        <Text style={styles.copyright}>
          © {new Date().getFullYear()} UNBC. All rights reserved.
        </Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#111',
  },

  backButton: {
  marginBottom: 10,
},

backText: {
  fontSize: 16,
  color: '#007AFF',
  fontWeight: '600',
},
  copyright: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    paddingTop: 20,
  },
});
