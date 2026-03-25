import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Create order
export const createOrder = (cartItems) => {
  const orderNumber = Date.now().toString(15).toUpperCase();

  return {
    orderNumber,
    items: cartItems,
    createdAt: new Date().toISOString(),
  };
};

// Save order
export const saveOrder = async (userId, order) => {
  try {
    console.log("saving order for user:", userId);
    console.log("order data:", order);

    await addDoc(collection(db, "users", userId, "orders"), {
      orderNumber: order.orderNumber,
      items: order.items.map((row) => ({
        id: row.item.id,
        name: row.item.name,
        price: row.item.price,
        quantity: row.quantity,
      })),
      total: order.items.reduce(
        (sum, row) => sum + row.item.price * row.quantity,
        0
      ),
      createdAt: new Date(),
      status: "confirmed",
    });

    console.log("order saved successfully");
  } catch (error) {
    console.log("Error saving order:", error);
  }
};

// Get order history
export const getOrders = async (userId) => {
  const ref = collection(db, "users", userId, "orders");
  const q = query(ref, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};