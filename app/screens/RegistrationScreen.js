import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useEmailStore } from '../context/EmailContext';
import CreateAccountButton from '../components/CreateAccountButton';

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const { setEmail } = useEmailStore();

  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [mobileNumberInput, setMobileNumberInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleSubmit = () => {
    if (
      !firstNameInput.trim() ||
      !lastNameInput.trim() ||
      !usernameInput.trim() ||
      !mobileNumberInput.trim() ||
      !emailInput.trim() ||
      password.length < 6 ||
      password !== confirmPasswordInput
    ) {
      Alert.alert(
        'Error',
        'Please fill in all fields and ensure passwords match (min 6 characters)'
      );
      return;
    }

    Alert.alert('Success', 'Account created successfully', [
      {
        text: 'OK',
        onPress: () => {
          setEmail(emailInput.trim());

          setFirstNameInput('');
          setLastNameInput('');
          setUsernameInput('');
          setMobileNumberInput('');
          setEmailInput('');
          setPassword('');
          setConfirmPasswordInput('');

          navigation.navigate('Login');
        },
      },
    ]);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Registration</Text>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstNameInput}
            onChangeText={setFirstNameInput}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastNameInput}
            onChangeText={setLastNameInput}
          />

          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={usernameInput}
            onChangeText={setUsernameInput}
          />

          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            value={mobileNumberInput}
            onChangeText={setMobileNumberInput}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailInput}
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

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            secureTextEntry
            value={confirmPasswordInput}
            onChangeText={setConfirmPasswordInput}
          />

          <CreateAccountButton onPress={handleSubmit} />

          <Text style={styles.copyright}>
            © {new Date().getFullYear()} UNBC. All rights reserved.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
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
  },
  copyright: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 20,
  },
});
