import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import { WelcomeScreen } from './WelcomeScreen.js';
import { MainMenu } from './MainMenu.js';
import { ShopMenu } from './ShopMenu.js';
import { CartView } from './CartView.js';
import { ProfileView } from './ProfileView.js';
import { HelpView } from './HelpView.js';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  origin: string;
  roast: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  orders: number;
}

type Screen = 'welcome' | 'menu' | 'shop' | 'cart' | 'profile' | 'help';

interface CoffeeShopAppProps {
  onExit: () => void;
}

export const CoffeeShopApp: React.FC<CoffeeShopAppProps> = ({ onExit }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Auto-transition from welcome screen
  useEffect(() => {
    if (showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
        setCurrentScreen('menu');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showWelcome]);

  // Global key handlers
  useInput((input, key) => {
    if (showWelcome) {
      // Skip welcome screen on any key press
      setShowWelcome(false);
      setCurrentScreen('menu');
      return;
    }

    // Global quit handler
    if (input === 'q' && currentScreen === 'menu') {
      onExit();
      return;
    }

    // Global back to menu handler
    if (input === 'b' && currentScreen !== 'menu') {
      setCurrentScreen('menu');
      return;
    }

    // Ctrl+C handler
    if (key.ctrl && input === 'c') {
      onExit();
      return;
    }
  });

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const loginUser = (email: string, name: string) => {
    setUser({
      id: `user_${Date.now()}`,
      email,
      name,
      orders: Math.floor(Math.random() * 10) // Mock order count
    });
  };

  const logoutUser = () => {
    setUser(null);
  };

  if (showWelcome) {
    return <WelcomeScreen />;
  }

  return (
    <Box flexDirection="column">
      {currentScreen === 'menu' && (
        <MainMenu 
          onNavigate={setCurrentScreen}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          user={user}
        />
      )}
      
      {currentScreen === 'shop' && (
        <ShopMenu 
          onAddToCart={addToCart}
          onBack={() => setCurrentScreen('menu')}
        />
      )}
      
      {currentScreen === 'cart' && (
        <CartView 
          cart={cart}
          onRemoveItem={removeFromCart}
          onClearCart={clearCart}
          onBack={() => setCurrentScreen('menu')}
          user={user}
        />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileView 
          user={user}
          onLogin={loginUser}
          onLogout={logoutUser}
          onBack={() => setCurrentScreen('menu')}
        />
      )}
      
      {currentScreen === 'help' && (
        <HelpView onBack={() => setCurrentScreen('menu')} />
      )}
    </Box>
  );
};