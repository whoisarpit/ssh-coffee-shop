import React from 'react';
import { Box, Text } from 'ink';

interface HelpViewProps {
  onBack: () => void;
}

export const HelpView: React.FC<HelpViewProps> = ({ onBack }) => {
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          === ❓ HELP & INFORMATION ===
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text color="white" bold>Welcome to SSH Coffee Shop!</Text>
      </Box>

      <Box marginBottom={2}>
        <Text color="gray">
          This is a terminal-based coffee ordering experience inspired by Terminal.shop.
          Navigate using single-letter commands and enjoy premium coffee from your terminal!
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Box marginBottom={1}>
          <Text color="yellow" bold>Navigation Commands:</Text>
        </Box>
        
        <Box marginLeft={2} flexDirection="column">
          <Box marginBottom={1}>
            <Text color="green" bold>S</Text>
            <Text> - Shop (browse coffee selection)</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="yellow" bold>C</Text>
            <Text> - Cart (view and manage your items)</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="blue" bold>P</Text>
            <Text> - Profile (login/logout and account info)</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="cyan" bold>H</Text>
            <Text> - Help (this screen)</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="red" bold>Q</Text>
            <Text> - Quit (exit from main menu)</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="red" bold>B</Text>
            <Text> - Back (return to main menu from any screen)</Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Box marginBottom={1}>
          <Text color="yellow" bold>Shopping:</Text>
        </Box>
        
        <Box marginLeft={2} flexDirection="column">
          <Box marginBottom={1}>
            <Text>• Select products by typing their number (1-4)</Text>
          </Box>
          <Box marginBottom={1}>
            <Text>• Items are automatically added to your cart</Text>
          </Box>
          <Box marginBottom={1}>
            <Text>• Login to place orders and checkout</Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Box marginBottom={1}>
          <Text color="yellow" bold>Technical Info:</Text>
        </Box>
        
        <Box marginLeft={2} flexDirection="column">
          <Box marginBottom={1}>
            <Text>• Built with React Ink for rich terminal UIs</Text>
          </Box>
          <Box marginBottom={1}>
            <Text>• SSH server powered by Node.js ssh2 library</Text>
          </Box>
          <Box marginBottom={1}>
            <Text>• Inspired by Terminal.shop's innovative approach</Text>
          </Box>
          <Box marginBottom={1}>
            <Text>• Blog post: arpit.io/blog/building-ssh-applications</Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Box marginBottom={1}>
          <Text color="yellow" bold>Keyboard Shortcuts:</Text>
        </Box>
        
        <Box marginLeft={2} flexDirection="column">
          <Box marginBottom={1}>
            <Text color="red" bold>Ctrl+C</Text>
            <Text> - Force exit from anywhere</Text>
          </Box>
          <Box marginBottom={1}>
            <Text color="gray" bold>Esc</Text>
            <Text> - Cancel current action (like login)</Text>
          </Box>
        </Box>
      </Box>

      <Box marginBottom={2}>
        <Text color="green">
          🌟 Enjoy your terminal coffee experience! 🌟
        </Text>
      </Box>

      <Box>
        <Text color="red" bold>[B] </Text>
        <Text>Back to main menu</Text>
      </Box>
    </Box>
  );
};