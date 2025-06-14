# 🃏 Threes Card Game

> A beautifully crafted web implementation of the classic Threes card game (also known as Shithead), featuring stunning animations, comprehensive error handling, and professional-grade user experience.

## ✨ Features

### 🎮 Game Features

- **Complete Rule Implementation** - All official Threes game rules with special card effects
- **Multi-Player Support** - 2-4 players with intelligent turn management
- **Card Exchange Phase** - Interactive card swapping with drag-and-drop functionality
- **Special Card Effects** - 2s (wild cards), 10s (pile clear), and four-of-a-kind handling
- **Smart AI Logic** - Automatic game progression and rule enforcement

### 🎨 Visual Excellence

- **Smooth Animations** - Card dealing, selection, and play animations with CSS keyframes
- **Modern UI Design** - Clean, responsive interface with gradient styling and shadows
- **Enhanced Feedback** - Button loading states, success animations, and visual confirmations
- **Mobile Responsive** - Optimized for both desktop and mobile devices

### 🛡️ Robust Engineering

- **Comprehensive Error Handling** - 8 specialized error types with automatic recovery
- **Performance Optimized** - Debounced updates, memory management, and efficient rendering
- **Memory Leak Prevention** - Automatic cleanup of event listeners and DOM elements
- **Browser Compatibility** - Tested on modern desktop browsers with graceful degradation

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open `index.html`** in a modern web browser
3. **Select Players** - Choose 2-4 players and enter names
4. **Start Playing** - Follow the intuitive on-screen instructions

No installation or setup required! Just open and play.

## 🎯 How to Play

### Game Setup

1. Each player receives 9 cards: 3 face-down, 3 face-up, 3 in hand
2. Players exchange cards between hand and face-up cards
3. Player with lowest face-up card goes first

### Gameplay

- **Play cards** equal to or higher than the top discard pile card
- **Pick up pile** if you can't play a valid card
- **Special Cards:**
  - **2s** - Wild cards (can be played on anything)
  - **10s** - Clear the pile and play again
  - **Four-of-a-kind** - Automatically clears the pile

### Winning

- First to play all cards wins
- Last player with cards is the "shithead"

## 🏗️ Technical Architecture

### Core Components

- **GameManager** - Main game controller with UI management
- **GameState** - Game state management and rule enforcement
- **Card/Player Classes** - Object-oriented game entities
- **Animation System** - CSS-based animations with JavaScript triggers

### Performance Features

- **Debounced DOM Updates** - Smooth rendering with minimal reflows
- **Memory Management** - Automatic cleanup and leak prevention
- **Event Optimization** - Efficient event handling with proper cleanup
- **Performance Monitoring** - Real-time performance tracking

### Error Handling System

- **8 Error Types** - Specialized handling for different error scenarios
- **Automatic Recovery** - Smart recovery mechanisms for common issues
- **User-Friendly Messages** - Clear, helpful error communication
- **Logging System** - Comprehensive error logging for debugging

## 📁 Project Structure

```
threes/
├── index.html          # Main game entry point
├── game.js            # Core game logic (2,700+ lines)
├── styles.css         # Enhanced styling (1,800+ lines)
├── README.md          # This documentation
├── todo.md            # Development progress tracking
└── test_*.html        # Comprehensive test suites
```

## 🧪 Testing

The project includes comprehensive test suites:

- **test_step14.html** - Error handling system tests
- **test_step15.html** - Final integration and performance tests
- **Multiple test files** - Step-by-step feature validation

Run tests by opening the test HTML files in your browser.

## 🌟 Development Highlights

### Animation System

- **Card Selection** - Smooth hover and selection animations
- **Card Dealing** - Realistic dealing animations with staggered timing
- **Button Feedback** - Loading states, success animations, and ripple effects
- **Visual Polish** - Shimmer effects, gradients, and enhanced shadows

### Error Handling Excellence

- **Proactive Validation** - Prevent errors before they occur
- **Graceful Recovery** - Automatic error recovery with user feedback
- **Context-Aware Messages** - Detailed error information for debugging
- **Memory Safe** - Proper cleanup and resource management

### Performance Optimization

- **Efficient Rendering** - Optimized DOM manipulation and updates
- **Memory Management** - Automatic cleanup of unused resources
- **Smooth Animations** - Hardware-accelerated CSS animations
- **Responsive Design** - Optimized for various screen sizes

## 🎨 Design Philosophy

This implementation prioritizes:

- **User Experience** - Intuitive, enjoyable gameplay
- **Visual Excellence** - Beautiful, modern interface design
- **Technical Quality** - Clean, maintainable, performant code
- **Accessibility** - Clear feedback and user-friendly interactions

## 🔧 Browser Requirements

- **Modern Desktop Browsers** - Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **JavaScript Enabled** - Required for game functionality
- **Local Storage** - Used for error logging and preferences

## 👥 Credits

### Development Team

- **Douglas Dollars** - Project Lead & Game Design
- **TurboBlasterMaximus** - Technical Implementation & Architecture

### Special Thanks

- Classic Threes/Shithead card game community
- Modern web development best practices
- CSS animation and performance optimization techniques

## 📄 License

MIT License - Feel free to use, modify, and distribute!

## 🎉 Final Notes

This project represents a complete, professional-quality implementation of the Threes card game, featuring:

- **2,700+ lines** of carefully crafted JavaScript
- **1,800+ lines** of polished CSS with animations
- **15-step development process** with comprehensive testing
- **Professional-grade** error handling and performance optimization

Ready to play? Open `index.html` and enjoy! 🎮

---

_Built with ❤️ using vanilla HTML, CSS, and JavaScript_
