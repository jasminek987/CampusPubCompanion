Campus Pub Companion:
A mobile companion app for The Thirsty Moose Pub at UNBC, built with React Native, Expo, and Firebase. Students can register an account, browse the menu, save favorites, view upcoming events and daily specials, place orders, and reorder past favorites — all from their phone.

Features:
Authentication:
Email + password registration with email verification required before first login
Secure login powered by Firebase Authentication
Resend verification email option built into the login flow
User session persisted across app restarts using AsyncStorage

Home:
Personalized greeting using the logged-in user's first name
Hero image, quick access to today's specials and pub info
Cart and Logout buttons in the top bar

Menu:
Items grouped by category (Salads, Appetizers, Mains, etc.) using a SectionList
Tap any item to open its detail screen
Menu data fetched from Firestore at runtime

Item Detail:
Full name, price, and description for the selected item
One-tap Add to Cart and Toggle Favorite

Events:
Upcoming pub events sorted by date (past events shown greyed out at the bottom)
Tap any event to expand and read the full description

Specials:
Daily discounted items pulled from Firestore
Shows both regular and special price

Favorites:
Per-user favorites stored in Firestore (users/{uid}/favorites)
Heart icon updates instantly using optimistic UI updates
Dedicated Favorites tab to browse saved items

Cart:
Add, increase, decrease, and remove items with immediate UI updates
Live total at the bottom of the screen
Quick links to browse the menu or proceed to checkout

Checkout and Order Flow:
Order summary with item count and total
One-tap Place Order writes the order to Firestore
Success screen with a unique order number, then auto-clears the cart

Order History and Reorder:
All past orders for the logged-in user, sorted newest first
Tap any order to view full details
Order Again button replaces the cart with the past order's items

Pub Info:
Weekly opening hours (today's row highlighted)
Address with a one-tap link to Google Maps
Phone, email, and social media links


How It Works:
Register — fill in profile details. The account is created in Firebase Auth, the profile is written to Firestore, and a verification email is sent. The app signs you out so you must verify before logging in.
Verify — click the link in the verification email.
Log in — the app refreshes your verification status and lets you in once verified.
Browse — explore the menu, events, specials, and pub info.
Add to cart — CartContext holds your cart in memory and updates the UI instantly.
Favorite — heart icons toggle locally, then sync to Firestore in the background.
Checkout — createOrder() builds the order object, saveOrder() writes it to your orders sub-collection.
Reorder — tap any past order in History to load it back into your cart.


Testing:
Automated tests are written with Jest and React Native Testing Library, covering:

Component tests — LoginButton renders and responds to taps
Component + service integration — MenuScreen calls getMenu() on mount and renders fetched items
Unit tests — createOrder() builds a valid order object
Integration tests — Firebase registration flow (auth + Firestore + verification email + signOut) and saveOrder() for the logged-in user

Firebase, AsyncStorage, and the service layer are mocked so tests run fast and don't hit real services.
npm test                  # run all tests
npm run test:coverage     # generate a coverage report (in /coverage)
npm run test:html         # generate an HTML test report (test-report.html)

Getting Started:
Prerequisites:

Node.js 18+ and npm
Expo Go app installed on your phone (iOS or Android), OR an iOS Simulator / Android Emulator

Setup:

Clone the repo:
git clone https://github.com/jasminek987/CampusPubCompanion.git
cd CampusPubCompanion

Install dependencies:
npm install

Configure Firebase (if running with your own backend)
Update firebase/firebaseConfig.js with your own Firebase project credentials, and seed your Firestore with menuItems, events, and specials collections (sample data is in app/data/).
Start the development server:
npx expo start

Run on your device:
Phone: scan the QR code with the Expo Go app
iOS Simulator: press i in the terminal
Android Emulator: press a in the terminal

Contributors:
Jasmine 
Niharika
Ruqaiya

