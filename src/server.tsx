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
        
        // Create a comprehensive stream wrapper for React Ink compatibility
        const makeInkCompatible = (stream: any) => {
          // TTY properties
          stream.isTTY = true;
          stream.rows = 24;
          stream.columns = 80;
          
          // Raw mode methods
          stream.setRawMode = () => stream;
          Object.defineProperty(stream, 'isRaw', {
            get: () => true,
            set: () => {},
            enumerable: true,
            configurable: true
          });
          
          // Node.js stream methods that React Ink expects
          stream.ref = () => stream;
          stream.unref = () => stream;
          stream.pause = stream.pause || (() => stream);
          stream.resume = stream.resume || (() => stream);
          stream.setEncoding = stream.setEncoding || (() => stream);
          
          // Event handling (ensure these exist)
          if (!stream.removeListener) {
            stream.removeListener = stream.off || (() => stream);
          }
          
          return stream;
        };
        
        // Make the stream compatible with React Ink
        makeInkCompatible(stream);
        
        console.log('🎨 Starting React Ink application...');
        
        // Start React Ink application with error handling
        try {
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
          
          console.log('✅ React Ink application started successfully');
          
          // Store unmount function for cleanup
          (stream as any)._inkUnmount = unmount;
        } catch (error) {
          console.error('❌ Failed to start React Ink application:', error);
          stream.write('Error: Failed to start terminal application\r\n');
          stream.write('Please ensure you connected with: ssh -t -p 2222 localhost\r\n');
          stream.end();
          return;
        }

        stream.on('close', () => {
          console.log('📱 Session closed');
          if ((stream as any)._inkUnmount) {
            (stream as any)._inkUnmount();
          }
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
          if ((stream as any)._inkUnmount) {
            (stream as any)._inkUnmount();
          }
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