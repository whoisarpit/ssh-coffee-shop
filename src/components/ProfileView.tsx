import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { User } from './CoffeeShopApp.js';

interface ProfileViewProps {
  user: User | null;
  onLogin: (email: string, name: string) => void;
  onLogout: () => void;
  onBack: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ 
  user, 
  onLogin, 
  onLogout, 
  onBack 
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [loginStep, setLoginStep] = useState<'email' | 'name' | 'processing'>('email');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [input, setInput] = useState('');

  useInput((inputChar, key) => {
    if (showLogin) {
      if (key.return) {
        if (loginStep === 'email') {
          setEmail(input);
          setInput('');
          setLoginStep('name');
        } else if (loginStep === 'name') {
          setName(input);
          setLoginStep('processing');
          
          // Simulate login process
          setTimeout(() => {
            onLogin(email, input);
            setShowLogin(false);
            setLoginStep('email');
            setEmail('');
            setName('');
            setInput('');
          }, 1000);
        }
        return;
      }
      
      if (key.escape) {
        setShowLogin(false);
        setLoginStep('email');
        setEmail('');
        setName('');
        setInput('');
        return;
      }
      
      if (key.backspace || key.delete) {
        setInput(prev => prev.slice(0, -1));
        return;
      }
      
      if (inputChar && !key.ctrl && !key.meta) {
        setInput(prev => prev + inputChar);
      }
      return;
    }

    // Regular menu navigation
    if (inputChar.toLowerCase() === 'l' && !user) {
      setShowLogin(true);
    } else if (inputChar.toLowerCase() === 'o' && user) {
      onLogout();
    }
  });

  if (showLogin) {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={2}>
          <Text color="cyan" bold>
            === 👤 LOGIN ===
          </Text>
        </Box>

        {loginStep === 'processing' ? (
          <Box>
            <Text color="yellow">🔐 Logging in... Please wait...</Text>
          </Box>
        ) : (
          <>
            <Box marginBottom={1}>
              <Text color="white">
                {loginStep === 'email' ? 'Enter your email:' : 'Enter your name:'}
              </Text>
            </Box>
            
            <Box marginBottom={2}>
              <Text color="green">{input}</Text>
              <Text color="gray">█</Text>
            </Box>
            
            <Box marginBottom={1}>
              <Text color="gray">Press Enter to continue, Esc to cancel</Text>
            </Box>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          === 👤 PROFILE ===
        </Text>
      </Box>

      {user ? (
        <>
          <Box marginBottom={2}>
            <Text color="green" bold>✅ Logged In</Text>
          </Box>
          
          <Box flexDirection="column" marginBottom={2}>
            <Box marginBottom={1}>
              <Text color="white" bold>Name: </Text>
              <Text>{user.name}</Text>
            </Box>
            
            <Box marginBottom={1}>
              <Text color="white" bold>Email: </Text>
              <Text>{user.email}</Text>
            </Box>
            
            <Box marginBottom={1}>
              <Text color="white" bold>User ID: </Text>
              <Text color="gray">{user.id}</Text>
            </Box>
            
            <Box marginBottom={1}>
              <Text color="white" bold>Previous Orders: </Text>
              <Text color="yellow">{user.orders}</Text>
            </Box>
          </Box>
          
          <Box marginBottom={2}>
            <Text color="gray">
              🎉 Thanks for being a valued customer!
            </Text>
          </Box>
          
          <Box marginBottom={2}>
            <Text color="red" bold>[O] </Text>
            <Text>Logout</Text>
          </Box>
        </>
      ) : (
        <>
          <Box marginBottom={2}>
            <Text color="gray">You are not logged in</Text>
          </Box>
          
          <Box marginBottom={2}>
            <Text color="green" bold>[L] </Text>
            <Text>Login to your account</Text>
          </Box>
          
          <Box marginBottom={2}>
            <Text color="gray">
              💡 Login to save your preferences and view order history
            </Text>
          </Box>
        </>
      )}

      <Box>
        <Text color="red" bold>[B] </Text>
        <Text>Back to main menu</Text>
      </Box>
    </Box>
  );
};