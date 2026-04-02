import React, { createContext, useContext, useState, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../../services/favoritesService';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const userId = user?.uid;

  useEffect(() => {
    const loadFavorites = async () => {
      if (!userId) {
        setFavorites([]);
        return;
      }

      try {
        const saved = await getFavorites(userId);
        setFavorites(saved);
      } catch (error) {
        console.log('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, [userId]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);

      if (existing) {
        return prev.map((p) =>
          p.item.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }

      return [...prev, { item, quantity: 1 }];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.item.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.item.id === id && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((p) => p.item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrderToCart = (items) => {
    const formatted = items.map((item) => ({
      item: {
        id: item.id,
        name: item.name,
        price: item.price,
      },
      quantity: item.quantity,
    }));

    setCartItems(formatted);
  };

  const isFavorited = (id) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = async (item) => {
    console.log('Saving favorite for user:', userId);
    console.log('Favorite item:', item);

    if (!userId) {
      console.log('No userId found');
      return;
    }

    const alreadyFavorite = favorites.some((fav) => fav.id === item.id);

    try {
      if (alreadyFavorite) {
        setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
        await removeFavorite(userId, item.id);
        console.log('Removed from Firestore');
      } else {
        setFavorites((prev) => [...prev, item]);
        await addFavorite(userId, item);
        console.log('Added to Firestore');
      }
    } catch (error) {
      console.log('Favorite error:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        addOrderToCart,
        favorites,
        isFavorited,
        toggleFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartStore = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartStore must be used within CartProvider');
  }

  return context;
};