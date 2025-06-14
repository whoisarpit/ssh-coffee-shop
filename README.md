# SSH Coffee Shop ☕

An SSH-based coffee ordering application inspired by [Terminal.shop](https://terminal.shop), built with React Ink for rich terminal user interfaces.

> **Blog Post**: Read about this project at [arpit.io/blog/building-ssh-applications-learning-from-terminalshop-coffee-experiment](https://arpit.io/blog/building-ssh-applications-learning-from-terminalshop-coffee-experiment)

## Features ✨

- 🌐 **SSH-only interface** - No web browser required
- ⚛️ **React Ink UI** - Rich terminal components with smooth rendering
- ☕ **Coffee shop simulation** - Browse products, manage cart, user profiles
- 🔐 **User authentication** - Login system with session management
- 🛒 **Shopping cart** - Add items, checkout simulation
- 📱 **Cross-platform** - Works on any SSH client (terminal, mobile, etc.)
- 🎨 **Colorful interface** - ANSI colors for better user experience

## Quick Start 🚀

### Prerequisites

- Node.js 18+ 
- pnpm package manager
- SSH client for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/whoisarpit/ssh-coffee-shop.git
cd ssh-coffee-shop

# Install dependencies
pnpm install

# Generate SSH host keys
pnpm run setup

# Start the SSH server
pnpm run dev
```

### Connect to the Coffee Shop

```bash
# Connect via SSH (default port 2222)
ssh -p 2222 localhost

# Or specify a different port
PORT=3333 pnpm run dev
ssh -p 3333 localhost
```

## How to Use 🎯

### Navigation Commands

| Key | Action |
|-----|--------|
| `S` | Shop - Browse coffee selection |
| `C` | Cart - View and manage items |
| `P` | Profile - Login/logout and account |
| `H` | Help - View commands and info |
| `Q` | Quit - Exit (from main menu) |
| `B` | Back - Return to main menu |

### Shopping Experience

1. **Browse Products**: Press `S` to view our coffee selection
2. **Add to Cart**: Select items by typing their number (1-4)
3. **Manage Cart**: Press `C` to view/remove items
4. **Login**: Press `P` to create an account
5. **Checkout**: Login first, then use `O` in cart to place order

### Coffee Selection ☕

- **Brazilian Blend** - $25.00 - Smooth and rich with chocolate notes
- **Colombian Supreme** - $28.00 - Premium single-origin with bright acidity  
- **Ethiopian Single Origin** - $32.00 - Exotic highlands coffee with floral notes
- **Kenya AA** - $30.00 - Bold coffee with wine-like acidity and berry notes

## Development 🛠️

### Project Structure

```
src/
├── server.tsx              # SSH server with React Ink integration
├── components/
│   ├── CoffeeShopApp.tsx   # Main application component
│   ├── WelcomeScreen.tsx   # Initial welcome screen
│   ├── MainMenu.tsx        # Navigation menu
│   ├── ShopMenu.tsx        # Product browsing
│   ├── CartView.tsx        # Shopping cart management
│   ├── ProfileView.tsx     # User authentication
│   └── HelpView.tsx        # Help and information
└── test-components.tsx     # Local testing without SSH
```

### Available Scripts

```bash
pnpm run dev              # Start SSH server in development mode
pnpm run build            # Compile TypeScript to JavaScript
pnpm run start            # Run compiled server
pnpm run test:components  # Test React components locally
pnpm run setup            # Generate SSH host keys
pnpm run generate-keys    # Generate SSH keys only
```

### Local Testing

Test the React Ink components without SSH:

```bash
pnpm run test:components
```

Note: Local testing requires a proper TTY environment. SSH provides the ideal terminal interface.

## Technical Details 🔧

### Architecture

- **SSH Server**: Node.js with `ssh2` library
- **UI Framework**: React Ink for terminal interfaces
- **Language**: TypeScript for type safety
- **Package Manager**: pnpm for efficient dependency management

### Key Technologies

- [ssh2](https://github.com/mscdex/ssh2) - SSH2 client and server modules
- [React Ink](https://github.com/vadimdemedes/ink) - React for interactive command-line apps
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at any scale

### Security Features

- Anonymous SSH connections (demo purposes)
- Input validation and sanitization
- Session management and cleanup
- Rate limiting capabilities (extendable)

## Configuration ⚙️

### Environment Variables

```bash
PORT=2222                 # SSH server port (default: 2222)
HOST_KEY_PATH=./host.key  # SSH host key file path
```

### Customization

1. **Add Products**: Edit the `PRODUCTS` array in `src/components/ShopMenu.tsx`
2. **Modify Colors**: Update color schemes in individual components
3. **Change Port**: Set `PORT` environment variable or modify `server.tsx`
4. **Add Features**: Extend components with new functionality

## Troubleshooting 🐛

### Common Issues

**Port Already in Use**
```bash
Error: EADDRINUSE: address already in use :::2222
```
Solution: Use a different port or stop the existing process
```bash
PORT=3333 pnpm run dev
```

**SSH Key Errors**
```bash
Error: Cannot parse privateKey: Malformed OpenSSH private key
```
Solution: Regenerate SSH keys
```bash
pnpm run generate-keys
```

**React Ink Raw Mode Error**
```bash
ERROR Raw mode is not supported on the current process.stdin
```
Solution: Use proper SSH connection instead of local testing, or ensure TTY environment.

### SSH Client Tips

- **Windows**: Use Windows Terminal, WSL, or PuTTY
- **macOS/Linux**: Built-in Terminal or iTerm2
- **Mobile**: Use apps like Termius or JuiceSSH
- **Web**: Browser-based SSH clients work too

## Inspiration 💡

This project is inspired by [Terminal.shop](https://terminal.shop), the world's first SSH-only coffee ordering service. Terminal.shop proved that SSH applications can be both practical and delightful, creating a unique developer-focused experience.

### Why SSH for E-commerce?

- **Developer-friendly**: Meets developers where they already work
- **Universal access**: Works on any device with SSH
- **Memorable experience**: Stands out in crowded markets
- **Technical authenticity**: Demonstrates understanding of developer culture

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links 🔗

- **Blog Post**: [Building SSH Applications: Learning from Terminal.shop](https://arpit.io/blog/building-ssh-applications-learning-from-terminalshop-coffee-experiment)
- **Terminal.shop**: [terminal.shop](https://terminal.shop) (the original inspiration)
- **GitHub**: [github.com/whoisarpit/ssh-coffee-shop](https://github.com/whoisarpit/ssh-coffee-shop)
- **Author**: [Arpit](https://arpit.io)

## Support ❤️

If you found this project helpful:
- ⭐ Star the repository
- 🐛 Report bugs or request features
- 📝 Share your experience with SSH applications
- ☕ Try [Terminal.shop](https://terminal.shop) for real coffee!

---

**Try it now**: `ssh -p 2222 localhost` (after running `pnpm run dev`)

Happy coding and enjoy your terminal coffee experience! ☕✨