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

// Basic initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Threes Card Game initialized!');
    console.log('Card ranks:', CARD_RANKS);
    console.log('Card suits:', CARD_SUITS);
    
    // Test card creation and deck functions
    const testCard = createCard('A', '♠');
    console.log('Test card created:', testCard.toString(), 'Value:', testCard.getValue());
    
    // Test deck creation and shuffling
    const deck = createDeck();
    console.log('Full deck created:', deck.length, 'cards');
    
    const shuffledDeck = shuffleDeck(deck);
    console.log('Deck shuffled. First 5 cards:', shuffledDeck.slice(0, 5).map(c => c.toString()));
    
    // Test game state management
    console.log('\n=== Testing Game State Management ===');
    gameState = new GameState();
    const playerNames = setupPlayers(3, ['Alice', 'Bob', 'Charlie']);
    gameState.initializeGame(playerNames);
    initializeDecks(gameState);
    
    console.log('Game state summary:', gameState.getStateSummary());
    console.log('Current player:', gameState.getCurrentPlayer().name);
    
    // Test player management
    gameState.players.forEach((player, index) => {
        console.log(`${player.name}: Hand(${player.handCards.length}), FaceUp(${player.faceUpCards.length}), FaceDown(${player.faceDownCards.length})`);
    });
    
    // Create test display with game state debug area
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Threes Card Game</h1>
        <div class="test-area">
            <h3>Card System Test</h3>
            <p>Deck created with ${deck.length} cards</p>
            <div class="card-container" id="sample-cards">
                <!-- Sample cards will be rendered here -->
            </div>
            <div class="card-container" id="face-down-cards">
                <!-- Face-down cards will be rendered here -->
            </div>
        </div>
        
        <div class="test-area">
            <h3>Game State Management Test</h3>
            <div id="game-state-debug">
                <!-- Game state info will be displayed here -->
            </div>
            <button id="next-player-btn" style="margin: 10px; padding: 8px 16px;">Next Player</button>
            <button id="refresh-state-btn" style="margin: 10px; padding: 8px 16px;">Refresh State</button>
        </div>
    `;
    
    // Render sample cards for testing
    const sampleCardsContainer = document.getElementById('sample-cards');
    const faceDownContainer = document.getElementById('face-down-cards');
    
    // Show some face-up cards (different suits and ranks)
    const sampleCards = [
        createCard('A', '♠'), createCard('K', '♥'), createCard('Q', '♦'), 
        createCard('J', '♣'), createCard('10', '♠'), createCard('2', '♥')
    ];
    
    sampleCards.forEach(card => {
        const cardElement = renderCard(card, false);
        sampleCardsContainer.appendChild(cardElement);
    });
    
    // Show some face-down cards
    for (let i = 0; i < 4; i++) {
        const cardElement = renderCard(shuffledDeck[i], true);
        faceDownContainer.appendChild(cardElement);
    }
    
    // Function to update game state display
    function updateGameStateDisplay() {
        const debugArea = document.getElementById('game-state-debug');
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
    }
    
    // Initial display update
    updateGameStateDisplay();
    
    // Add event listeners for testing buttons
    document.getElementById('next-player-btn').addEventListener('click', function() {
        gameState.nextPlayer();
        updateGameStateDisplay();
    });
    
    document.getElementById('refresh-state-btn').addEventListener('click', function() {
        updateGameStateDisplay();
    });
    
    // Add click event to test card selection
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card.face-up')) {
            const card = e.target.closest('.card');
            card.classList.toggle('selected');
        }
    });
}); 