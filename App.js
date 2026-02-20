import React from 'react';
import { EmailProvider } from './app/context/EmailContext';
import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  return (
    <EmailProvider>
      <AppNavigator />
    </EmailProvider>
  );
}