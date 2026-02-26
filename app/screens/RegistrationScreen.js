import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    if (!firstNameInput.trim()) return Alert.alert('Error', 'First name is empty');
    if (!lastNameInput.trim()) return Alert.alert('Error', 'Last name is empty');
    if (!usernameInput.trim()) return Alert.alert('Error', 'Username is empty');
    if (!mobileNumberInput.trim()) return Alert.alert('Error', 'Mobile number is empty');
    if (!emailInput.trim()) return Alert.alert('Error', 'Email is empty');
    if (password.length < 6) return Alert.alert('Error', 'Password must be at least 6 characters');
    if (password !== confirmPasswordInput) return Alert.alert('Error', 'Passwords do not match');

    // Save email for other screens
    setEmail(emailInput.trim());

    // Clear inputs
    setFirstNameInput('');
    setLastNameInput('');
    setUsernameInput('');
    setMobileNumberInput('');
    setEmailInput('');
    setPassword('');
    setConfirmPasswordInput('');

    // Navigate reliably (don’t depend on Alert button callback)
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
    });

    // Optional confirmation message (no callback)
    Alert.alert('Success', 'Account created successfully');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>Registration</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
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
            autoCapitalize="none"
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
      </KeyboardAvoidingView>
    </SafeAreaView>
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