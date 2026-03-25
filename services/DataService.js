import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export async function getEvents() {
  const snapshot = await getDocs(collection(db, 'events'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getSpecials() {
  const snapshot = await getDocs(collection(db, 'specials'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function getMenu() {
  const snapshot = await getDocs(collection(db, 'menuItems'));
  const items = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const grouped = {};
  items.forEach(item => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item);
  });

  return Object.keys(grouped).map(cat => ({
    category: cat,
    items: grouped[cat]
  }));
}

export default { getEvents, getSpecials, getMenu };
