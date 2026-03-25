// seedFirestore.js
// Run this ONCE from your project root folder:
//   node seedFirestore.js
//
// It will upload ALL events, specials, and menu items to Firestore automatically.

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// ── Your Firebase config (copied from firebase/firebaseConfig.js) ──
const firebaseConfig = {
  apiKey: "AIzaSyC732YCOp59YLpa7NEExt_33g7qK58GgXc",
  authDomain: "campuspubcompanion-5c942.firebaseapp.com",
  projectId: "campuspubcompanion-5c942",
  storageBucket: "campuspubcompanion-5c942.firebasestorage.app",
  messagingSenderId: "1020087843021",
  appId: "1:1020087843021:web:e7d0ad8fb2358a52261184",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ── All your static data (copied from your data files) ──

const eventsData = [
  {
    name: "Karaoke Night",
    date: "March 5, 2026",
    time: "8:00 PM",
    description: "Grab the mic and sing your favorite songs! Prizes for best performance and crowd favorite."
  },
  {
    name: "Trivia Night",
    date: "March 12, 2026",
    time: "7:00 PM",
    description: "Team up and test your knowledge in general trivia, pop culture, and sports. Winning team gets gift cards."
  },
  {
    name: "Swing Dance Evening",
    date: "March 18, 2026",
    time: "6:30 PM",
    description: "Beginner-friendly swing dance lesson followed by open dance floor. No partner required."
  },
  {
    name: "Mock Wedding Party",
    date: "March 22, 2026",
    time: "9:00 PM",
    description: "A themed night where guests dress up for a fake wedding celebration. DJ, games, and themed drinks included."
  },
  {
    name: "Stand-Up Comedy Show",
    date: "March 26, 2026",
    time: "8:30 PM",
    description: "Local comedians performing live. Expect a night full of laughs and crowd interaction."
  },
  {
    name: "Magic Show Night",
    date: "April 2, 2026",
    time: "7:30 PM",
    description: "An interactive magic performance featuring illusions, mind tricks, and audience participation."
  }
];

const specialsData = [
  { day: "Tuesday",   name: "Spicy Chicken Burger",    originalPrice: 12.49, specialPrice: 8.99,  description: "Classic deep-fried spicy chicken burger." },
  { day: "Wednesday", name: "BBQ Beef Burger",         originalPrice: 12.49, specialPrice: 8.99,  description: "100% beef burger charbroiled with BBQ sauce." },
  { day: "Thursday",  name: "BBQ Pulled Pork Burger",  originalPrice: 12.99, specialPrice: 8.99,  description: "Pulled pork in BBQ sauce with purple cabbage, carrot, and coleslaw dressing." },
  { day: "Friday",    name: "Fish & Chips",            originalPrice: 18.29, specialPrice: 15.49, description: "Two pieces of deep-fried battered fish with fries and house-made tartar sauce." },
  { day: "Saturday",  name: "Pub Nachos",              originalPrice: 16.99, specialPrice: 13.99, description: "Tortillas topped with melted cheese, tomato, green onion, banana peppers, served with salsa and sour cream." },
  { day: "Sunday",    name: "Glazed Chicken Wings",    originalPrice: 17.49, specialPrice: 14.99, description: "Deep-fried jumbo chicken wings (8) with choice of sauce or dry rub." },
  { day: "Monday",    name: "Moose Fries",             originalPrice: 17.49, specialPrice: 14.49, description: "Lattice fries with mozzarella cheese, green onions, and house-made moose sauce." }
];

// Menu items flattened — each item gets a 'category' field so we can group them in the app
const menuItemsData = [
  // Salads
  { category: "Salads", name: "House Caesar Salad",        price: 13.49, description: "Romaine, house-made Caesar dressing, croutons, parmesan cheese, and Texas garlic toast." },
  { category: "Salads", name: "Wintergarden Quinoa Salad", price: 13.99, description: "Romaine, purple cabbage, cucumber, carrot, cranberries, quinoa, topped with feta cheese." },
  { category: "Salads", name: "Spicy Chicken Salad",       price: 17.49, description: "Romaine, tomato, carrot, cucumber, mozzarella cheese, and spicy chicken." },

  // Appetizers
  { category: "Appetizers", name: "Pub Nachos",                    price: 16.99, description: "Tortillas topped with melted cheese, tomato, green onion, banana peppers, served with salsa and sour cream." },
  { category: "Appetizers", name: "Moose Fries",                   price: 17.49, description: "Lattice fries with mozzarella cheese, green onions, and house-made moose sauce." },
  { category: "Appetizers", name: "Glazed Chicken Wings",          price: 17.49, description: "Deep-fried jumbo chicken wings (8) with choice of sauce or dry rub." },
  { category: "Appetizers", name: "Lava Poutine",                  price: 18.99, description: "Classic pub poutine topped with lava chicken." },
  { category: "Appetizers", name: "Black Bean Quesadilla",         price: 16.99, description: "Black bean pieces, tomato, onion, banana peppers, melted mozzarella. Served with salsa and sour cream." },
  { category: "Appetizers", name: "Pulled Pork Poutine",           price: 18.99, description: "Classic pub poutine topped with BBQ pulled pork." },
  { category: "Appetizers", name: "Yam Fries",                     price: 11.99, description: "Crispy yam fries served with house-made chipotle mayo." },
  { category: "Appetizers", name: "Chicken Quesadilla",            price: 17.99, description: "Grilled chicken, tomato, onion, banana peppers, melted mozzarella. Served with salsa and sour cream." },
  { category: "Appetizers", name: "French Onion Cactus Potatoes",  price: 9.99,  description: "Deep-fried cactus cut potatoes served with french onion dip." },
  { category: "Appetizers", name: "Basket of Fries",               price: 9.99,  description: "Regular seasoned fries." },
  { category: "Appetizers", name: "Basket of Curly Fries",         price: 10.99, description: "Seasoned curly fries." },
  { category: "Appetizers", name: "Deep Fried Pickles",            price: 10.99, description: "Deep-fried pickles served with ranch dip." },
  { category: "Appetizers", name: "Spring Rolls",                  price: 10.99, description: "Deep-fried vegetable spring rolls with sweet & spicy dip." },
  { category: "Appetizers", name: "Snack Size Moose Fries",        price: 10.99, description: "Lattice fries with mozzarella cheese, green onions, and house-made moose sauce." },

  // Burgers
  { category: "Burgers", name: "Spicy Chicken Burger",      price: 12.49, description: "Classic deep-fried spicy chicken burger." },
  { category: "Burgers", name: "BBQ Pulled Pork Burger",    price: 12.99, description: "Pulled pork in BBQ sauce with purple cabbage, carrot, and coleslaw dressing." },
  { category: "Burgers", name: "Bacon Cheddar Burger",      price: 13.49, description: "100% beef burger with melted cheddar cheese and two slices of bacon." },
  { category: "Burgers", name: "Applewood Chicken Burger",  price: 12.49, description: "Grilled marinated chicken breast topped with Applewood smoked cheddar." },
  { category: "Burgers", name: "Bison Lumberjack Burger",   price: 13.69, description: "Charbroiled bison burger topped with Monterey Jack cheese and crispy onion rings." },
  { category: "Burgers", name: "Impossible Burger",         price: 10.49, description: "Plant-based patty served with lettuce, tomato, and garlic mayo." },
  { category: "Burgers", name: "Lava Chicken Burger",       price: 12.99, description: "Deep-fried spicy chicken burger topped with house-made lava sauce." },
  { category: "Burgers", name: "Black Bean Burger",         price: 13.49, description: "Classic black bean patty served with lettuce, tomato, and garlic mayo." },
  { category: "Burgers", name: "Crunchy Chicken Burger",    price: 12.49, description: "Classic deep-fried crunchy chicken patty." },
  { category: "Burgers", name: "BBQ Beef Burger",           price: 12.49, description: "100% beef burger charbroiled with BBQ sauce." },
  { category: "Burgers", name: "Cajun Chicken Burger",      price: 12.99, description: "Grilled marinated chicken breast with Cajun spice." },

  // Baskets
  { category: "Baskets", name: "Chicken Bites",            price: 18.99, description: "Breaded chicken bites with fries and choice of dipping sauce." },
  { category: "Baskets", name: "Fish & Chips",             price: 18.29, description: "Two pieces of deep-fried battered fish with fries and house-made tartar sauce." },
  { category: "Baskets", name: "Vegetarian Fish & Chips",  price: 18.29, description: "Plant-based fish with fries and house-made tartar sauce." },
];

// ── Upload function ──
async function uploadCollection(collectionName, dataArray) {
  console.log(`\nUploading ${dataArray.length} items to '${collectionName}'...`);
  const col = collection(db, collectionName);
  for (const item of dataArray) {
    await addDoc(col, item);
    process.stdout.write(".");   // prints a dot for each item uploaded
  }
  console.log(`\n✓ Done! ${dataArray.length} documents added to '${collectionName}'`);
}

// ── Run everything ──
async function seedAll() {
  try {
    await uploadCollection("events",    eventsData);
    await uploadCollection("specials",  specialsData);
    await uploadCollection("menuItems", menuItemsData);
    console.log("\n All done! Your Firestore database is now seeded.");
    process.exit(0);
  } catch (err) {
    console.error("\nError uploading data:", err.message);
    process.exit(1);
  }
}

seedAll();