// ABOUTME: This file contains the core game logic for the Threes card game web application
// ABOUTME: It includes card management, game state, player logic, and all interactive functionality

// Card data structures and constants
const CARD_RANKS = ['2', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];

// Game phase constants
const GAME_PHASES = {
    SETUP: 'setup',
    EXCHANGE: 'exchange', 
    PLAYING: 'playing',
    GAME_OVER: 'game_over'
};

// Card Class
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
        this.id = `${rank}-${suit}`;
    }
    
    // Get card value for comparison (2=14, A=13, K=12, etc.)
    getValue() {
        const rankValues = {
            '2': 14, 'A': 13, 'K': 12, 'Q': 11, 'J': 10,
            '10': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3
        };
        return rankValues[this.rank] || 0;
    }
    
    // Get card display string
    toString() {
        return `${this.rank}${this.suit}`;
    }
    
    // Check if this is a red suit
    isRed() {
        return this.suit === '♥' || this.suit === '♦';
    }
    
    // Check if this is a black suit
    isBlack() {
        return this.suit === '♠' || this.suit === '♣';
    }
}

// Player Class
class Player {
    constructor(name) {
        this.name = name;
        this.handCards = [];
        this.faceUpCards = [];
        this.faceDownCards = [];
        this.isActive = true;
        this.hasFinished = false;
    }
    
    // Add a card to specified location
    addCard(card, location = 'hand') {
        switch(location) {
            case 'hand':
                this.handCards.push(card);
                break;
            case 'faceUp':
                this.faceUpCards.push(card);
                break;
            case 'faceDown':
                this.faceDownCards.push(card);
                break;
            default:
                console.error('Invalid card location:', location);
        }
    }
    
    // Remove a card from specified location
    removeCard(cardId, location = 'hand') {
        let cards;
        switch(location) {
            case 'hand':
                cards = this.handCards;
                break;
            case 'faceUp':
                cards = this.faceUpCards;
                break;
            case 'faceDown':
                cards = this.faceDownCards;
                break;
            default:
                console.error('Invalid card location:', location);
                return null;
        }
        
        const cardIndex = cards.findIndex(card => card.id === cardId);
        if (cardIndex !== -1) {
            return cards.splice(cardIndex, 1)[0];
        }
        return null;
    }
    
    // Get total card count for player
    getCardCount() {
        return this.handCards.length + this.faceUpCards.length + this.faceDownCards.length;
    }
    
    // Get cards by location
    getCards(location) {
        switch(location) {
            case 'hand': return [...this.handCards];
            case 'faceUp': return [...this.faceUpCards];
            case 'faceDown': return [...this.faceDownCards];
            default: return [];
        }
    }
    
    // Check if player has finished (no cards left)
    checkFinished() {
        this.hasFinished = this.getCardCount() === 0;
        if (this.hasFinished) {
            this.isActive = false;
        }
        return this.hasFinished;
    }
}

// GameState Class
class GameState {
    constructor() {
        this.players = [];
        this.currentPlayerIndex = 0;
        this.gamePhase = GAME_PHASES.SETUP;
        this.deck = [];
        this.discardPile = [];
        this.drawPile = [];
    }
    
    // Initialize the game with players
    initializeGame(playerNames) {
        this.players = playerNames.map(name => new Player(name));
        this.deck = createDeck();
        this.drawPile = shuffleDeck(this.deck);
        this.discardPile = [];
        this.currentPlayerIndex = 0;
        this.gamePhase = GAME_PHASES.SETUP;
        console.log(`Game initialized with ${this.players.length} players`);
    }
    
    // Get the current active player
    getCurrentPlayer() {
        if (this.players.length === 0) return null;
        return this.players[this.currentPlayerIndex];
    }
    
    // Move to the next player
    nextPlayer() {
        if (this.players.length === 0) return;
        
        // Find next active player
        let nextIndex = (this.currentPlayerIndex + 1) % this.players.length;
        let attempts = 0;
        
        while (attempts < this.players.length && !this.players[nextIndex].isActive) {
            nextIndex = (nextIndex + 1) % this.players.length;
            attempts++;
        }
        
        if (attempts < this.players.length) {
            this.currentPlayerIndex = nextIndex;
        }
        
        console.log(`Turn passed to: ${this.getCurrentPlayer().name}`);
    }
    
    // Check if game is over (only one player left)
    checkGameOver() {
        const activePlayers = this.players.filter(p => p.isActive);
        if (activePlayers.length <= 1) {
            this.gamePhase = GAME_PHASES.GAME_OVER;
            return true;
        }
        return false;
    }
    
    // Get game state summary for debugging
    getStateSummary() {
        return {
            phase: this.gamePhase,
            currentPlayer: this.getCurrentPlayer()?.name,
            playerCount: this.players.length,
            activePlayerCount: this.players.filter(p => p.isActive).length,
            drawPileSize: this.drawPile.length,
            discardPileSize: this.discardPile.length
        };
    }
}

// Utility Functions

// Create a full 52-card deck
function createDeck() {
    const deck = [];
    for (const suit of CARD_SUITS) {
        for (const rank of CARD_RANKS) {
            deck.push(new Card(rank, suit));
        }
    }
    return deck;
}

// Fisher-Yates shuffle implementation
function shuffleDeck(deck) {
    const shuffled = [...deck]; // Create a copy
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create DOM element for a card
function renderCard(card, faceDown = false) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.dataset.cardId = card.id;
    
    if (faceDown) {
        cardElement.classList.add('face-down');
        cardElement.innerHTML = '<div class="card-back">🂠</div>';
    } else {
        cardElement.classList.add('face-up');
        if (card.isRed()) {
            cardElement.classList.add('red-suit');
        } else {
            cardElement.classList.add('black-suit');
        }
        
        cardElement.innerHTML = `
            <div class="card-content">
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${card.suit}</div>
            </div>
        `;
    }
    
    return cardElement;
}

// Basic card creation function
function createCard(rank, suit) {
    return new Card(rank, suit);
}

// Game Initialization Functions

// Setup players with default names if needed
function setupPlayers(playerCount, playerNames = []) {
    const names = [];
    for (let i = 0; i < playerCount; i++) {
        names.push(playerNames[i] || `Player ${i + 1}`);
    }
    return names;
}

// Initialize decks and deal initial cards
function initializeDecks(gameState) {
    if (!gameState || gameState.players.length === 0) {
        console.error('Cannot initialize decks without valid game state and players');
        return;
    }
    
    console.log('Initializing decks and dealing cards...');
    
    // Deal initial cards to each player
    gameState.players.forEach(player => {
        // Deal 3 face-down cards
        for (let i = 0; i < 3; i++) {
            if (gameState.drawPile.length > 0) {
                const card = gameState.drawPile.pop();
                player.addCard(card, 'faceDown');
            }
        }
        
        // Deal 3 face-up cards
        for (let i = 0; i < 3; i++) {
            if (gameState.drawPile.length > 0) {
                const card = gameState.drawPile.pop();
                player.addCard(card, 'faceUp');
            }
        }
        
        // Deal 3 hand cards
        for (let i = 0; i < 3; i++) {
            if (gameState.drawPile.length > 0) {
                const card = gameState.drawPile.pop();
                player.addCard(card, 'hand');
            }
        }
        
        console.log(`${player.name}: ${player.getCardCount()} cards dealt`);
    });
    
    console.log(`Cards remaining in draw pile: ${gameState.drawPile.length}`);
}

// Global game state instance
let gameState = null;

// Setup Screen Module
const setupScreen = {
    // Initialize the setup screen
    init() {
        console.log('Threes Card Game initialized!');
        this.render();
        this.attachEventListeners();
    },
    
    // Render the setup screen HTML
    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div id="setup-screen" class="setup-container">
                <div class="setup-header">
                    <h1 class="game-title">Threes</h1>
                    <p class="game-subtitle">The Classic Card Game</p>
                </div>
                
                <div class="setup-form">
                    <div class="player-count-section">
                        <h3>Number of Players</h3>
                        <div class="player-count-selector">
                            <input type="radio" id="players-2" name="playerCount" value="2">
                            <label for="players-2">2 Players</label>
                            
                            <input type="radio" id="players-3" name="playerCount" value="3" checked>
                            <label for="players-3">3 Players</label>
                            
                            <input type="radio" id="players-4" name="playerCount" value="4">
                            <label for="players-4">4 Players</label>
                        </div>
                    </div>
                    
                    <div class="player-names-section">
                        <h3>Player Names</h3>
                        <div id="player-name-inputs" class="player-name-inputs">
                            <!-- Player name inputs will be generated here -->
                        </div>
                    </div>
                    
                    <div class="setup-actions">
                        <button id="start-game-btn" class="start-game-btn">Start Game</button>
                    </div>
                </div>
            </div>
            
            <div id="game-area" class="game-area hidden">
                <!-- Game interface will be rendered here -->
            </div>
        `;
        
        // Generate initial player name inputs for 3 players (default)
        this.generatePlayerNameInputs(3);
    },
    
    // Generate player name input fields
    generatePlayerNameInputs(count) {
        const container = document.getElementById('player-name-inputs');
        container.innerHTML = '';
        
        for (let i = 1; i <= count; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = `
                <label for="player-${i}-name">Player ${i}</label>
                <input type="text" id="player-${i}-name" class="player-name-input" 
                       placeholder="Player ${i}" value="Player ${i}">
            `;
            container.appendChild(inputGroup);
        }
    },
    
    // Attach event listeners
    attachEventListeners() {
        // Player count change
        document.querySelectorAll('input[name="playerCount"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const count = parseInt(e.target.value);
                this.generatePlayerNameInputs(count);
            });
        });
        
        // Start game button
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startGame();
        });
    },
    
    // Validate setup form
    validateSetup() {
        const playerCount = parseInt(document.querySelector('input[name="playerCount"]:checked').value);
        const names = [];
        
        for (let i = 1; i <= playerCount; i++) {
            const nameInput = document.getElementById(`player-${i}-name`);
            const name = nameInput.value.trim();
            
            if (!name) {
                this.showError(`Player ${i} name cannot be empty`);
                nameInput.focus();
                return null;
            }
            
            if (names.includes(name)) {
                this.showError(`Player names must be unique. "${name}" is already used.`);
                nameInput.focus();
                return null;
            }
            
            names.push(name);
        }
        
        return { playerCount, names };
    },
    
    // Show error message  
    showError(message) {
        // Remove existing error
        const existingError = document.querySelector('.setup-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'setup-error';
        errorDiv.textContent = message;
        
        const setupActions = document.querySelector('.setup-actions');
        setupActions.insertBefore(errorDiv, setupActions.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    },
    
    // Start the game
    startGame() {
        const setupData = this.validateSetup();
        if (!setupData) return;
        
        const { playerCount, names } = setupData;
        
        console.log(`Starting game with ${playerCount} players:`, names);
        
        // Initialize game state
        gameState = new GameState();
        gameState.initializeGame(names);
        initializeDecks(gameState);
        
        console.log('Game initialized:', gameState.getStateSummary());
        
        // Hide setup screen and show game area
        this.hideSetup();
        this.showGameArea();
    },
    
    // Hide setup screen
    hideSetup() {
        const setupScreen = document.getElementById('setup-screen');
        setupScreen.classList.add('hidden');
    },
    
    // Show game area
    showGameArea() {
        const gameArea = document.getElementById('game-area');
        gameArea.classList.remove('hidden');
        
        // For now, show a simple game started message with debug info
        gameArea.innerHTML = `
            <div class="game-header">
                <h2>Game Started!</h2>
                <p>Players: ${gameState.players.map(p => p.name).join(', ')}</p>
            </div>
            
            <div class="test-area">
                <h3>Game State Debug</h3>
                <div id="game-state-debug">
                    <!-- Game state info will be displayed here -->
                </div>
                <button id="next-player-btn" class="debug-btn">Next Player</button>
                <button id="refresh-state-btn" class="debug-btn">Refresh State</button>
            </div>
        `;
        
        this.updateGameStateDisplay();
        this.attachGameEventListeners();
    },
    
    // Update game state display (same as before but moved here)
    updateGameStateDisplay() {
        const debugArea = document.getElementById('game-state-debug');
        if (!debugArea) return;
        
        const summary = gameState.getStateSummary();
        
        let html = `
            <p><strong>Game Phase:</strong> ${summary.phase}</p>
            <p><strong>Current Player:</strong> ${summary.currentPlayer}</p>
            <p><strong>Active Players:</strong> ${summary.activePlayerCount}/${summary.playerCount}</p>
            <p><strong>Draw Pile:</strong> ${summary.drawPileSize} cards</p>
            <p><strong>Discard Pile:</strong> ${summary.discardPileSize} cards</p>
            <hr>
            <h4>Player Details:</h4>
        `;
        
        gameState.players.forEach((player, index) => {
            const isCurrentPlayer = index === gameState.currentPlayerIndex;
            html += `
                <p ${isCurrentPlayer ? 'style="font-weight: bold; color: #3498db;"' : ''}>
                    ${player.name}: ${player.getCardCount()} cards total 
                    (Hand: ${player.handCards.length}, Face-up: ${player.faceUpCards.length}, Face-down: ${player.faceDownCards.length})
                    ${!player.isActive ? ' - FINISHED' : ''}
                    ${isCurrentPlayer ? ' ← CURRENT' : ''}
                </p>
            `;
        });
        
        debugArea.innerHTML = html;
    },
    
    // Attach game area event listeners
    attachGameEventListeners() {
        const nextBtn = document.getElementById('next-player-btn');
        const refreshBtn = document.getElementById('refresh-state-btn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                gameState.nextPlayer();
                this.updateGameStateDisplay();
            });
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.updateGameStateDisplay();
            });
        }
    }
};

// Basic initialization
document.addEventListener('DOMContentLoaded', function() {
    setupScreen.init();
}); 