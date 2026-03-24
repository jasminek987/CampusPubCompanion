import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const addFavorite = async (userId, item) => {
  const ref = doc(db, "users", userId, "favorites", String(item.id));
  await setDoc(ref, {
    itemId: item.id,
    name: item.name,
    price: item.price,
    description: item.description || "",
    image: item.image || "",
    createdAt: new Date()
  });
};

export const removeFavorite = async (userId, itemId) => {
  const ref = doc(db, "users", userId, "favorites", String(itemId));
  await deleteDoc(ref);
};

export const getFavorites = async (userId) => {
  const ref = collection(db, "users", userId, "favorites");
  const snapshot = await getDocs(ref);
  return snapshot.docs.map((doc) => doc.data());
};