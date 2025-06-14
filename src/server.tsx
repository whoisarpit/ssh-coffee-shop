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
      
      // Handle PTY allocation requests
      session.on('pty', (accept, reject, info) => {
        console.log('🖥️  PTY requested:', info);
        const ptyStream = accept();
        if (ptyStream) {
          // Set up the PTY stream properties for React Ink
          (ptyStream as any).rows = info.rows || 24;
          (ptyStream as any).columns = info.cols || 80;
          (ptyStream as any).isTTY = true;
          
          // Add required properties for raw mode support
          (ptyStream as any).setRawMode = () => {
            // Mock setRawMode - the SSH stream handles this
            return ptyStream;
          };
          
          // Mock the isRaw property
          Object.defineProperty(ptyStream, 'isRaw', {
            get: () => true,
            set: () => {},
            enumerable: true,
            configurable: true
          });
        }
      });
      
      session.on('shell', (accept, reject) => {
        const stream = accept();
        
        // Set up stream properties for React Ink compatibility
        (stream as any).isTTY = true;
        (stream as any).rows = 24;
        (stream as any).columns = 80;
        
        // Add setRawMode method that React Ink expects
        (stream as any).setRawMode = () => {
          // SSH handles raw mode, so we just return the stream
          return stream;
        };
        
        // Add isRaw property
        Object.defineProperty(stream, 'isRaw', {
          get: () => true,
          set: () => {},
          enumerable: true,
          configurable: true
        });
        
        console.log('🎨 Starting React Ink application...');
        
        // Start React Ink application
        const { unmount } = render(
          <CoffeeShopApp 
            onExit={() => {
              console.log('👋 Exiting application...');
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
        stream.on('window-change', (info: any) => {
          console.log('📐 Window resized:', info);
          if ((stream as any).rows !== undefined) (stream as any).rows = info.rows;
          if ((stream as any).columns !== undefined) (stream as any).columns = info.cols;
        });
        
        // Handle stream errors
        stream.on('error', (err: any) => {
          console.error('💥 Stream error:', err.message);
          unmount();
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
  console.log(`🔗 Connect with: ssh -t -p ${PORT} localhost`);
  console.log(`💡 Note: Use -t flag to allocate a pseudo-terminal`);
  console.log('⚠️  Use Ctrl+C to stop server');
});

server.on('error', (err: any) => {
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