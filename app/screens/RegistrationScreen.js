import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView
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
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
    const [mobileNumberInput, setMobileNumberInput] = useState('');
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleSubmit = () => {
    if (!firstNameInput || !lastNameInput || !emailInput || !password || password.length < 5 ||
         !mobileNumberInput || password !== confirmPasswordInput) {
      Alert.alert('Error', 'Please fill in all fields and ensure passwords match');
      return;
    }

   Alert.alert('Success', 'Account created successfully', [
  {
    text: 'OK',
    onPress: () => {
      setEmail(emailInput);

      // Reset form
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
        <Header title="Registration" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Text style={styles.label}>Firstname</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstNameInput}
            onChangeText={setFirstNameInput}
          />

          <Text style={styles.label}>Lastname</Text>
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
            keyboardType="numeric"
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
        </View>

        <View>
          <CreateAccountButton onPress={handleSubmit} />
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} UNBC. All rights reserved.
          </Text>
        </View>
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
    justifyContent: 'space-between',
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
    paddingTop: 20,
  },
});

