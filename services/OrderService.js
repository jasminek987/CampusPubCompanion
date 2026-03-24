import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const saveOrder = async (userId, order) => {
  try {
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
  } catch (error) {
    console.log("Error saving order:", error);
  }
};