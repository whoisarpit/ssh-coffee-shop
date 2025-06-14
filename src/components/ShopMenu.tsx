import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import type { Product } from './CoffeeShopApp.js';

interface ShopMenuProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onBack: () => void;
}

const PRODUCTS: Product[] = [
  {
    id: 'brazilian-blend',
    name: 'Brazilian Blend',
    price: 25.00,
    description: 'Smooth and rich Brazilian coffee beans with chocolate notes',
    origin: 'Brazil',
    roast: 'Medium'
  },
  {
    id: 'colombian-supreme',
    name: 'Colombian Supreme',
    price: 28.00,
    description: 'Premium Colombian single-origin with bright acidity',
    origin: 'Colombia',
    roast: 'Medium-Dark'
  },
  {
    id: 'ethiopian-single',
    name: 'Ethiopian Single Origin',
    price: 32.00,
    description: 'Exotic Ethiopian highlands coffee with floral notes',
    origin: 'Ethiopia',
    roast: 'Light'
  },
  {
    id: 'kenya-aa',
    name: 'Kenya AA',
    price: 30.00,
    description: 'Bold Kenyan coffee with wine-like acidity and berry notes',
    origin: 'Kenya',
    roast: 'Medium-Dark'
  }
];

export const ShopMenu: React.FC<ShopMenuProps> = ({ onAddToCart, onBack }) => {
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useInput((input) => {
    const num = parseInt(input);
    if (num >= 1 && num <= PRODUCTS.length) {
      const product = PRODUCTS[num - 1];
      onAddToCart(product);
      setLastAdded(product.name);
      
      // Clear the "added" message after 2 seconds
      setTimeout(() => setLastAdded(null), 2000);
    }
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={2}>
        <Text color="cyan" bold>
          === ☕ COFFEE SELECTION ☕ ===
        </Text>
      </Box>

      <Box marginBottom={2}>
        <Text color="gray">
          Premium coffee beans, ethically sourced and freshly roasted
        </Text>
      </Box>

      {lastAdded && (
        <Box marginBottom={1}>
          <Text color="green" bold>
            ✅ Added {lastAdded} to cart!
          </Text>
        </Box>
      )}

      <Box flexDirection="column" marginBottom={2}>
        {PRODUCTS.map((product, index) => (
          <Box key={product.id} flexDirection="column" marginBottom={1}>
            <Box>
              <Text color="green" bold>[{index + 1}] </Text>
              <Text color="white" bold>{product.name}</Text>
              <Text color="yellow"> - ${product.price.toFixed(2)}</Text>
            </Box>
            <Box marginLeft={4}>
              <Text color="gray">{product.description}</Text>
            </Box>
            <Box marginLeft={4}>
              <Text color="blue">Origin: {product.origin}</Text>
              <Text color="magenta"> | Roast: {product.roast}</Text>
            </Box>
          </Box>
        ))}
      </Box>

      <Box marginBottom={2}>
        <Text color="gray">
          Select a product (1-{PRODUCTS.length}) to add to cart
        </Text>
      </Box>

      <Box>
        <Text color="red" bold>[B] </Text>
        <Text>Back to main menu</Text>
      </Box>
    </Box>
  );
};