#!/usr/bin/env tsx
import React from 'react';
import { render } from 'ink';
import { CoffeeShopApp } from './components/CoffeeShopApp.js';

console.log('🧪 Testing SSH Coffee Shop Components...\n');

// Test the components locally without SSH
const { waitUntilExit } = render(
  <CoffeeShopApp 
    onExit={() => {
      console.log('\n👋 Thanks for testing the coffee shop!');
      process.exit(0);
    }}
  />
);

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Test interrupted');
  process.exit(0);
});

console.log('💡 This is a local test of the React Ink components');
console.log('📱 Use the same commands as in the SSH version\n');

waitUntilExit();