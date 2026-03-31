import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEmailStore } from '../context/EmailContext';
import CreateAccountButton from '../components/CreateAccountButton';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    if (!firstNameInput.trim()) {
      Alert.alert('Error', 'First name is empty');
      return;
    }

    if (!lastNameInput.trim()) {
      Alert.alert('Error', 'Last name is empty');
      return;
    }

    if (!usernameInput.trim()) {
      Alert.alert('Error', 'Username is empty');
      return;
    }

    if (!mobileNumberInput.trim()) {
      Alert.alert('Error', 'Mobile number is empty');
      return;
    }

    if (!emailInput.trim()) {
      Alert.alert('Error', 'Email is empty');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPasswordInput) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInput.trim(),
        password
      );

      const firebaseUser = userCredential.user;

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        firstName: firstNameInput.trim(),
        lastName: lastNameInput.trim(),
        username: usernameInput.trim(),
        mobileNumber: mobileNumberInput.trim(),
        email: emailInput.trim(),
        createdAt: new Date().toISOString(),
      });

      setEmail(emailInput.trim());

      setFirstNameInput('');
      setLastNameInput('');
      setUsernameInput('');
      setMobileNumberInput('');
      setEmailInput('');
      setPassword('');
      setConfirmPasswordInput('');

      Alert.alert('Success', 'Account created successfully');

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
      });
    } catch (error) {
      Alert.alert('Registration Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registration</Text>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 30 }}
          keyboardShouldPersistTaps="handled"
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

          <CreateAccountButton onPress={handleSubmit} disabled={loading} />
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
  backButton: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
  },
  backText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
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
});