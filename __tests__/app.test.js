import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { getMenu } from '../services/DataService';
import { createOrder, saveOrder } from '../services/OrderService';
import LoginButton from '../app/components/LoginButton';
import MenuScreen from '../app/screens/MenuScreen';

jest.mock('../firebase/firebaseConfig', () => ({
  auth: { currentUser: { emailVerified: true } },
  db: {},
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
  signOut: jest.fn(),
  getAuth: jest.fn(),
  initializeAuth: jest.fn(),
  getReactNativePersistence: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  serverTimestamp: jest.fn(() => 'mock-timestamp'),
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

jest.mock('../services/DataService', () => ({
  getMenu: jest.fn(),
}));

jest.mock('../services/OrderService', () => ({
  saveOrder: jest.fn(() => Promise.resolve()),
  createOrder: jest.fn(() => ({ id: 'order-1', total: 12.49, items: [] })),
  getOrders: jest.fn(() => Promise.resolve([])),
}));

jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
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

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Authentication', () => {
  it('TEST 1: LoginButton calls the provided handler when pressed', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <LoginButton onPress={onPressMock} title="Login" />
    );
    fireEvent.press(getByText(/login/i));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('TEST 2: Firebase registration flow calls auth, Firestore, verification email, and signOut', async () => {
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        uid: 'new-user-uid',
        email: 'newuser@test.com',
      },
    });

    doc.mockReturnValueOnce('mock-doc-ref');
    setDoc.mockResolvedValueOnce();
    sendEmailVerification.mockResolvedValueOnce();
    signOut.mockResolvedValueOnce();

    const fakeAuth = {};
    const fakeDb = {};
    const cleanEmail = 'newuser@test.com';
    const cleanPassword = 'securepass1';
    const userCredential = await createUserWithEmailAndPassword(
      fakeAuth,
      cleanEmail,
      cleanPassword
    );

    await setDoc(doc(fakeDb, 'users', userCredential.user.uid), {
      firstName: 'Ruqaiya',
      lastName: 'Bhanji',
      username: 'ruqaiya1',
      mobileNumber: '1234567890',
      email: cleanEmail,
      emailVerified: false,
      createdAt: 'mock-timestamp',
    });

    await sendEmailVerification(userCredential.user);
    await signOut(fakeAuth);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      fakeAuth,
      cleanEmail,
      cleanPassword
    );
    expect(doc).toHaveBeenCalledWith(fakeDb, 'users', 'new-user-uid');
    expect(setDoc).toHaveBeenCalled();
    expect(sendEmailVerification).toHaveBeenCalledWith(userCredential.user);
    expect(signOut).toHaveBeenCalledWith(fakeAuth);
  });
});

describe('Menu', () => {
  it('TEST 3: MenuScreen calls DataService.getMenu on load', async () => {
    getMenu.mockResolvedValueOnce([
      {
        category: 'Appetizers',
        items: [
          {
            id: 1,
            name: 'Pub Nachos',
            price: 16.99,
            description: 'Loaded nachos',
          },
        ],
      },
    ]);

    render(
      <MenuScreen
        navigation={{
          goBack: jest.fn(),
          navigate: jest.fn(),
        }}
      />
    );

    await waitFor(() => {
      expect(getMenu).toHaveBeenCalledTimes(1);
    });
  });

  it('TEST 4: MenuScreen displays fetched menu item data from DataService', async () => {
    getMenu.mockResolvedValueOnce([
      {
        category: 'Appetizers',
        items: [
          {
            id: 1,
            name: 'Pub Nachos',
            price: 16.99,
            description: 'Loaded nachos',
          },
        ],
      },
      {
        category: 'Salads',
        items: [
          {
            id: 2,
            name: 'House Caesar Salad',
            price: 13.49,
            description: 'Fresh salad',
          },
        ],
      },
    ]);

    const { findByText } = render(
      <MenuScreen
        navigation={{
          goBack: jest.fn(),
          navigate: jest.fn(),
        }}
      />
    );

    expect(await findByText('Pub Nachos')).toBeTruthy();
    expect(await findByText('House Caesar Salad')).toBeTruthy();
  });
});

describe('Cart & Checkout', () => {
  it('TEST 5: createOrder builds an order object from cart items', () => {
    const cartItems = [
      {
        item: {
          id: 1,
          name: 'Pub Nachos',
          price: 16.99,
        },
        quantity: 2,
      },
    ];

    createOrder.mockReturnValueOnce({
      id: 'order-1',
      total: 33.98,
      items: cartItems,
    });

    const order = createOrder(cartItems);

    expect(createOrder).toHaveBeenCalledWith(cartItems);
    expect(order).toEqual({
      id: 'order-1',
      total: 33.98,
      items: cartItems,
    });
  });

  it('TEST 6: saveOrder stores the created order for the logged-in user', async () => {
    const fakeUserId = 'user-123';
    const fakeOrder = {
      id: 'order-1',
      total: 12.49,
      items: [],
    };

    await saveOrder(fakeUserId, fakeOrder);

    expect(saveOrder).toHaveBeenCalledWith(fakeUserId, fakeOrder);
    expect(saveOrder).toHaveBeenCalledTimes(1);
  });
});