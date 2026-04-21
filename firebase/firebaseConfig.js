import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyC732YCOp59YLpa7NEExt_33g7qK58GgXc',
  authDomain: 'campuspubcompanion-5c942.firebaseapp.com',
  projectId: 'campuspubcompanion-5c942',
  storageBucket: 'campuspubcompanion-5c942.firebasestorage.app',
  messagingSenderId: '1020087843021',
  appId: '1:1020087843021:web:e7d0ad8fb2358a52261184',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

export const db = getFirestore(app); 