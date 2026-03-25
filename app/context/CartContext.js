import React, { createContext, useContext, useState, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../../services/favoritesService';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const userId = "testUser1";

  // Load favorites from Firestore on startup
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await getFavorites(userId);
        setFavorites(saved);
      } catch (error) {
        console.log('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // ---------- Cart ----------
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

  // --------Favorites---------
  const isFavorited = (id) => favorites.some((fav) => fav.id === id);

  const toggleFavorite = async (item) => {
    const alreadyFavorite = favorites.some((fav) => fav.id === item.id);

    if (alreadyFavorite) {
      setFavorites((prev) => prev.filter((fav) => fav.id !== item.id));
      await removeFavorite(userId, item.id);
    } else {
      setFavorites((prev) => [...prev, item]);
      await addFavorite(userId, item);
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