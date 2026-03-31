import React from 'react';
import { EmailProvider } from './app/context/EmailContext';
import { CartProvider } from './app/context/CartContext'; 
import AppNavigator from './app/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { db } from '../../firebaseConfig';
console.log("Firebase connected:", db);

export default function App() {
  return (
    <SafeAreaProvider>
    <EmailProvider>
    <CartProvider>
    <AppNavigator/>
    </CartProvider>
    </EmailProvider>
    </SafeAreaProvider>
  );
}