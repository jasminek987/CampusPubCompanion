console.log("App starting...");
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { EmailProvider } from '../context/EmailContext';
import EventsScreen from '../screens/EventsScreen';
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


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


  function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>

      {/* Top Bar */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        padding: 16 
      }}>
        <Text>Hey, User</Text>
        <Text onPress={() => navigation.navigate('Cart')}>
          Cart
        </Text>
      </View>

      {/* Specials Swipe */}
      <ScrollView horizontal style={{ paddingHorizontal: 16 }}>
        <View style={{ 
          width: 260, 
          height: 150, 
          marginRight: 16, 
          backgroundColor: '#ddd', 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 12
        }}>
          <Text>Specials Today</Text>
        </View>

        <View style={{ 
          width: 260, 
          height: 150, 
          marginRight: 16, 
          backgroundColor: '#ccc', 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 12
        }}>
          <Text>More Specials</Text>
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={{ padding: 16 }}>
        <Text onPress={() => navigation.navigate('Specials')}>
          Today's Specials
        </Text>

        <Text onPress={() => navigation.navigate('Events')}>
          Events
        </Text>

        <Text onPress={() => navigation.navigate('Menu')}>
          Menu
        </Text>

        <Text onPress={() => navigation.navigate('Info')}>
          Pub Info
        </Text>
      </View>

    </View>
  );
}


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
          <Ionicons name={iconMap[route.name]?.[focused ? 0 : 1] || 'help-outline'} size={size} color={color} />
        ),
        headerShown: false,
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
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Specials" component={SpecialsScreen} />
        <Stack.Screen name="Events" component={EventsScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />  
        <Stack.Screen name="ItemDetail" component={ItemDetailScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </EmailProvider>
  );
}
