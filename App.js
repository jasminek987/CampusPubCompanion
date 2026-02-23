import React from 'react';
import { EmailProvider } from './app/context/EmailContext';
import { CartProvider } from './app/context/CartContext'; 
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  return (
    <EmailProvider>
  <CartProvider>
    <AppNavigator />
  </CartProvider>
</EmailProvider>
  );
}