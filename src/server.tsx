#!/usr/bin/env tsx
import ssh2 from 'ssh2';
import { readFileSync } from 'fs';

const { Server } = ssh2;
import { render } from 'ink';
import React from 'react';
import { CoffeeShopApp } from './components/CoffeeShopApp.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 2222;
const HOST_KEY_PATH = './host.key';

console.log('🚀 Starting SSH Coffee Shop Server...');

// Create SSH server
const server = new Server({
  hostKeys: [readFileSync(HOST_KEY_PATH)]
}, (client) => {
  console.log('☕ Client connected!');

  client.on('authentication', (ctx) => {
    // Allow anonymous connections for demo purposes
    console.log(`🔐 Auth attempt: ${ctx.method} for ${ctx.username}`);
    ctx.accept();
  });

  client.on('ready', () => {
    console.log('✅ Client authenticated!');

    client.on('session', (accept, reject) => {
      const session = accept();
      
      session.on('shell', (accept, reject) => {
        const stream = accept();
        
        // Start React Ink application
        const { unmount } = render(
          <CoffeeShopApp 
            onExit={() => {
              unmount();
              stream.end();
            }}
          />, 
          { 
            stdout: stream as any,
            stdin: stream as any,
            debug: false
          }
        );

        stream.on('close', () => {
          console.log('📱 Session closed');
          unmount();
        });

        // Handle window resize
        stream.on('window-change', () => {
          // React Ink handles this automatically
        });
      });
    });
  });

  client.on('close', () => {
    console.log('👋 Client disconnected');
  });

  client.on('error', (err) => {
    console.error('❌ Client error:', err.message);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ SSH Coffee Shop listening on port ${PORT}`);
  console.log(`🔗 Connect with: ssh -p ${PORT} localhost`);
  console.log('⚠️  Use Ctrl+C to stop server');
});

server.on('error', (err) => {
  console.error('💥 Server error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.log(`💡 Port ${PORT} is already in use. Try a different port or stop the existing process.`);
  }
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down SSH Coffee Shop server...');
  server.close(() => {
    console.log('👋 Server closed. Goodbye!');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});