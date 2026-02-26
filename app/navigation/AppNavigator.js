import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { EmailProvider } from '../context/EmailContext';
import { CartProvider } from '../context/CartContext';
import EventsScreen from '../screens/EventsScreen';
import HomeScreen from '../screens/HomeScreen';
import MenuScreen from '../screens/MenuScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import InfoScreen from '../screens/InfoScreen';
import LoginForm from '../screens/LoginScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import SpecialsScreen from '../screens/SpecialsScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
console.log("App starting...");


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


 
function BottomTabNavigator() {
  const iconMap = {
    Home: ['home', 'home-outline'],
    Events: ['calendar', 'calendar-outline'],
    Menu: ['restaurant', 'restaurant-outline'],
    Favorites: ['heart', 'heart-outline'],
    Info: ['information-circle', 'information-circle-outline'],
  };

  return (
    <Tab.Navigator
     screenOptions={({ route }) => ({
  tabBarIcon: ({ focused, size, color }) => (
    <Ionicons
      name={
        iconMap[route.name]?.[focused ? 0 : 1] || 'help-outline'
      }
      size={size}
      color={color}
    />
  ),
  headerShown: false,

  tabBarStyle: {
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 0,
  },

  tabBarItemStyle: {
    flex: 1,
    paddingVertical: 4,
  },
})}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Info" component={InfoScreen} />

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <EmailProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </EmailProvider>
  );
}
