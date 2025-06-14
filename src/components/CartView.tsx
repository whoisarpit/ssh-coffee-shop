import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { CartItem, User } from './CoffeeShopApp.js';

interface CartViewProps {
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onBack: () => void;
  user: User | null;
}

export const CartView: React.FC<CartViewProps> = ({ 
  cart, 
  onRemoveItem, 
  onClearCart, 
  onBack,
  user 
}) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'confirm' | 'processing' | 'complete'>('confirm');

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useInput((input) => {
    if (showCheckout) {
      if (checkoutStep === 'confirm') {
        if (input.toLowerCase() === 'y') {
          setCheckoutStep('processing');
          // Simulate payment processing
          setTimeout(() => {
            setCheckoutStep('complete');
            setTimeout(() => {
              onClearCart();
              setShowCheckout(false);
              setCheckoutStep('confirm');
              onBack();
            }, 3000);
          }, 2000);
        } else if (input.toLowerCase() === 'n') {
          setShowCheckout(false);
        }
      }
      return;
    }

    const num = parseInt(input);
    if (num >= 1 && num <= cart.length) {
      onRemoveItem(cart[num - 1].id);
    } else if (input.toLowerCase() === 'o' && cart.length > 0) {
      if (!user) {
        // Could implement guest checkout or require login
        return;
      }
      setShowCheckout(true);
    } else if (input.toLowerCase() === 'c' && cart.length > 0) {
      onClearCart();
    }
  });

  if (showCheckout) {
    return (
      <Box flexDirection="column" padding={1}>
        <Box marginBottom={2}>
          <Text color="cyan" bold>
            === 🛒 CHECKOUT ===
          </Text>
        </Box>

        {checkoutStep === 'confirm' && (
          <>
            <Box marginBottom={1}>
              <Text color="white">Order Summary:</Text>
            </Box>
            {cart.map((item) => (
              <Box key={item.id} marginBottom={1} marginLeft={2}>
                <Text>{item.quantity}x {item.name} - ${(item.price * item.quantity).toFixed(2)}</Text>
              </Box>
            ))}
            <Box marginBottom={2} marginLeft={2}>
              <Text color="green" bold>Total: ${total.toFixed(2)}</Text>
            </Box>
            
            <Box marginBottom={1}>
              <Text color="yellow">Confirm your order? [Y/N]: </Text>
            </Box>
          </>
        )}

        {checkoutStep === 'processing' && (
          <Box marginBottom={2}>
            <Text color="yellow">💳 Processing payment... Please wait...</Text>
          </Box>
        )}

        {checkoutStep === 'complete' && (
          <>
            <Box marginBottom={1}>
              <Text color="green" bold>✅ Order placed successfully!</Text>
            </Box>
            <Box marginBottom={1}>
              <Text>📧 Confirmation email sent to {user?.email}</Text>
            </Box>
            <Box marginBottom={1}>
              <Text>📦 Your coffee will ship within 2-3 business days</Text>
            </Box>
            <Box>
              <Text color="gray">Returning to main menu...</Text>
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
          === 🛒 SHOPPING CART ===
        </Text>
      </Box>

      {cart.length === 0 ? (
        <Box marginBottom={2}>
          <Text color="gray">Your cart is empty. Visit the shop to add some coffee!</Text>
        </Box>
      ) : (
        <>
          <Box marginBottom={2}>
            <Text color="white">Your Items:</Text>
          </Box>
          
          {cart.map((item, index) => (
            <Box key={item.id} flexDirection="column" marginBottom={1}>
              <Box>
                <Text color="red" bold>[{index + 1}] </Text>
                <Text color="white">{item.quantity}x {item.name}</Text>
                <Text color="yellow"> - ${(item.price * item.quantity).toFixed(2)}</Text>
              </Box>
              <Box marginLeft={4}>
                <Text color="gray">${item.price.toFixed(2)} each | {item.origin} | {item.roast} roast</Text>
              </Box>
            </Box>
          ))}

          <Box marginBottom={2} marginTop={1}>
            <Text color="green" bold>
              Total: ${total.toFixed(2)}
            </Text>
          </Box>

          <Box flexDirection="column" marginBottom={2}>
            <Box marginBottom={1}>
              <Text color="gray">
                Select item number (1-{cart.length}) to remove
              </Text>
            </Box>
            
            {user ? (
              <Box marginBottom={1}>
                <Text color="green" bold>[O] </Text>
                <Text>Order - Proceed to checkout</Text>
              </Box>
            ) : (
              <Box marginBottom={1}>
                <Text color="gray">
                  💡 Login to your profile to place an order
                </Text>
              </Box>
            )}
            
            <Box marginBottom={1}>
              <Text color="red" bold>[C] </Text>
              <Text>Clear cart</Text>
            </Box>
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