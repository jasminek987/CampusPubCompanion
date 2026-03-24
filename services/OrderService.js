import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// Create order (UI logic)
export const createOrder = (cartItems) => {
  const orderNumber = Date.now().toString(15).toUpperCase();

  return {
    orderNumber,
    items: cartItems,
    createdAt: new Date().toISOString(),
  };
};

// Save order to Firebase
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