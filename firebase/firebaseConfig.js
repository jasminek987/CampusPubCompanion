
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC732YCOp59YLpa7NEExt_33g7qK58GgXc",
  authDomain: "campuspubcompanion-5c942.firebaseapp.com",
  projectId: "campuspubcompanion-5c942",
  storageBucket: "campuspubcompanion-5c942.firebasestorage.app",
  messagingSenderId: "1020087843021",
  appId: "1:1020087843021:web:e7d0ad8fb2358a52261184",
  measurementId: "G-RB98D18Q1Z"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;