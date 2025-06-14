import React from 'react';
import { Box, Text, useInput } from 'ink';
import type { User } from './CoffeeShopApp.js';

interface MainMenuProps {
  onNavigate: (screen: 'shop' | 'cart' | 'profile' | 'help') => void;
  cartItemCount: number;
  user: User | null;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, cartItemCount, user }) => {
  useInput((input) => {
    switch (input.toLowerCase()) {
      case 's':
        onNavigate('shop');
        break;
      case 'c':
        onNavigate('cart');
        break;
      case 'p':
        onNavigate('profile');
        break;
      case 'h':
        onNavigate('help');
        break;
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          === ☕ SSH COFFEE SHOP ☕ ===
        </Text>
      </Box>

      <Box marginBottom={1}>
        <Text color="gray">
          Welcome to the terminal-based coffee experience!
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text color="gray">
          {user ? `Logged in as: ${user.name}` : 'Not logged in'}
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Box marginBottom={1}>
          <Text color="green" bold>[S] </Text>
          <Text>Shop - Browse our premium coffee selection</Text>
        </Box>
        
        <Box marginBottom={1}>
          <Text color="yellow" bold>[C] </Text>
          <Text>Cart - View your items </Text>
          {cartItemCount > 0 && (
            <Text color="magenta">({cartItemCount} items)</Text>
          )}
        </Box>
        
        <Box marginBottom={1}>
          <Text color="blue" bold>[P] </Text>
          <Text>Profile - Account & settings</Text>
        </Box>
        
        <Box marginBottom={1}>
          <Text color="cyan" bold>[H] </Text>
          <Text>Help - Commands & information</Text>
        </Box>
        
        <Box>
          <Text color="red" bold>[Q] </Text>
          <Text>Quit - Exit the coffee shop</Text>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Choose an option (S/C/P/H/Q): 
        </Text>
      </Box>
    </Box>
  );
};