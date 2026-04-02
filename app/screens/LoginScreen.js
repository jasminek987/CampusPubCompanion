import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useEmailStore } from '../context/EmailContext';
import LoginButton from '../components/LoginButton';
import CreateAccountButton from '../components/CreateAccountButton';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

const LOGO_URI =
  'https://images.squarespace-cdn.com/content/v1/61154824a557d54827fa7e49/1634057838043-H5MLXFNY8JSXZY8C1E2V/thirsty+moose+pub+logo.jpg?format=1500w';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { setEmail } = useEmailStore();

  const [email, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      Alert.alert('Error', 'Email is empty');
      return false;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    if (!cleanPassword) {
      Alert.alert('Error', 'Password is empty');
      return false;
    }

    if (cleanPassword.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (loading) return;
    if (!validate()) return;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        cleanPassword
      );

      const user = userCredential.user;
      await user.reload();

      // 🔥 EMAIL VERIFICATION LOGIC
      if (!auth.currentUser?.emailVerified) {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email before logging in.',
          [
            {
              text: 'Resend Email',
              onPress: async () => {
                try {
                  if (auth.currentUser) {
                    await sendEmailVerification(auth.currentUser);
                    Alert.alert(
                      'Verification Sent',
                      'A new verification email has been sent.'
                    );
                  }
                } catch (err) {
                  Alert.alert(
                    'Error',
                    'Could not resend verification email right now.'
                  );
                }
              },
            },
            { text: 'OK', style: 'cancel' },
          ]
        );

        await signOut(auth);
        return;
      }

      // ✅ SUCCESS LOGIN
      setEmail(cleanEmail);
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
      let msg = 'Something went wrong';

      if (error.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Invalid email format.';
      } else if (error.code === 'auth/too-many-requests') {
        msg = 'Too many attempts. Please try again later.';
      }

      Alert.alert('Login Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* HEADER WITH LOGO */}
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Image source={{ uri: LOGO_URI }} style={styles.logo} />
          <Text style={styles.title}>Thirsty Moose Pub</Text>
          <Text style={styles.logintext}>Login</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
  container: { flex: 1, backgroundColor: '#fff' },

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

  header: { paddingTop: 20, paddingBottom: 10 },

  headerCenter: { alignItems: 'center' },

  logo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  logintext: {
    fontSize: 18,
    color: '#555',
    textDecorationLine: 'underline',
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