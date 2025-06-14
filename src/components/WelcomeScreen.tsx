import React from 'react';
import { Box, Text } from 'ink';

export const WelcomeScreen: React.FC = () => {
  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height={20}>
      <Box marginBottom={1}>
        <Text color="cyan" bold>
          ☕ SSH COFFEE SHOP ☕
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="yellow">
          Inspired by Terminal.shop
        </Text>
      </Box>
      
      <Box marginBottom={2}>
        <Text color="green">
          Built with React Ink ⚡
        </Text>
      </Box>
      
      <Box>
        <Text color="gray">
          Press any key to continue...
        </Text>
      </Box>
    </Box>
  );
};