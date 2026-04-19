import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../app/context/AuthContext';
import { CartProvider } from '../app/context/CartContext';

jest.mock('../firebase/firebaseConfig', () => ({
  auth: {},
  db: {},
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  signOut: jest.fn(),
  getAuth: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
  getApp: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('../app/context/EmailContext', () => ({
  useEmailStore: () => ({
    email: 'test@test.com',
    setEmail: jest.fn(),
  }),
}));

import LoginScreen from '../app/screens/LoginScreen';
import LoginButton from '../app/components/LoginButton';
import HomeScreen from '../app/screens/HomeScreen';
import FavoritesScreen from '../app/screens/FavoritesScreen';
import CartScreen from '../app/screens/CartScreen';

const renderWithNav = (component) =>
  render(
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <NavigationContainer>{component}</NavigationContainer>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );

// TEST 1: Smoke Test
describe('Smoke Test', () => {
  it('LoginScreen renders without crashing', () => {
    renderWithNav(<LoginScreen />);
  });
});

// TEST 2: Unit Test
describe('Unit Test', () => {
  it('LoginButton renders without crashing', () => {
    render(<LoginButton onPress={() => {}} title="Login" />);
  });
});

// TEST 3: Sanity Test
describe('Sanity Test', () => {
  it('HomeScreen renders without crashing', () => {
    renderWithNav(<HomeScreen />);
  });
});

// TEST 4: Integration Test
describe('Integration Test', () => {
  it('FavoritesScreen renders without crashing', () => {
    renderWithNav(<FavoritesScreen />);
  });
});

// TEST 5: Regression Test
describe('Regression Test', () => {
  it('CartScreen renders without crashing', () => {
    renderWithNav(<CartScreen />);
  });
});