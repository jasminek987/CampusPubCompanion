import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './app/navigation/AppNavigator';
import { AuthProvider } from './app/context/AuthContext';
import { EmailProvider } from './app/context/EmailContext';
import { CartProvider } from './app/context/CartContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <EmailProvider>
          <CartProvider>
            <AppNavigator />
          </CartProvider>
        </EmailProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}