import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEmailStore } from '../context/EmailContext';
import LoginButton from '../components/LoginButton';
import CreateAccountButton from '../components/CreateAccountButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setEmail } = useEmailStore();

  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      Alert.alert('Error', 'Email is empty');
      return false;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Password is empty');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    console.log('Login pressed');

    if (loading) return;
    if (!validate()) return;

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      console.log('Login success:', userCredential.user.uid);

      setEmail(email.trim());

      setEmailInput('');
      setPassword('');

      Alert.alert('Success', 'Logged in successfully', [
        {
          text: 'OK',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs', params: { screen: 'Home' } }],
            });
          },
        },
      ]);
    } catch (error) {
      console.log('LOGIN ERROR FULL:', error);
      Alert.alert('Login Error', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Login</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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

          <LoginButton onPress={handleLogin} disabled={loading} />

          <CreateAccountButton
            onPress={() => navigation.navigate('CreateAccount')}
            disabled={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 6,
  },
  backText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
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
});