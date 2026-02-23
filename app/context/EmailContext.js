import React, { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [email, setEmail] = useState('');

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export const useEmailStore = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmailStore must be used within EmailProvider');
  }
  return context;
};
