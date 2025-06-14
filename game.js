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
function renderCard(card, faceDown = false, isSelectable = false) {
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
        
        if (isSelectable) {
            cardElement.classList.add('selectable');
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

// Render player area with all card types
function renderPlayerArea(player, isCurrentPlayer = false) {
    const playerCards = {
        faceDown: player.faceDownCards.map(card => 
            renderCard(card, true, false).outerHTML
        ).join(''),
        faceUp: player.faceUpCards.map(card => 
            renderCard(card, false, isCurrentPlayer).outerHTML
        ).join(''),
        hand: isCurrentPlayer ? player.handCards.map(card => 
            renderCard(card, false, true).outerHTML
        ).join('') : ''
    };
    
    return playerCards;
}

// Render center area (draw and discard piles)
function renderCenterArea(gameState) {
    const drawPileHTML = gameState.drawPile.length > 0 ? 
        renderCard(gameState.drawPile[gameState.drawPile.length - 1], true).outerHTML : 
        '<div class="empty-pile">Empty</div>';
        
    const discardPileHTML = gameState.discardPile.length > 0 ?
        gameState.discardPile.slice(-3).map(card => renderCard(card, false).outerHTML).join('') :
        '<div class="empty-pile">Empty</div>';
        
    return { drawPileHTML, discardPileHTML };
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

// Enhanced card dealing system
function dealInitialCards(gameState) {
    if (!gameState || gameState.players.length === 0) {
        console.error('Cannot deal cards without valid game state and players');
        return false;
    }
    
    console.log('=== Starting Card Dealing ===');
    
    // Ensure we have enough cards
    const requiredCards = gameState.players.length * 9; // 9 cards per player
    if (gameState.drawPile.length < requiredCards) {
        console.error(`Not enough cards in draw pile. Need ${requiredCards}, have ${gameState.drawPile.length}`);
        return false;
    }
    
    // Deal in proper order: face-down first, then face-up, then hand
    console.log('Dealing face-down cards...');
    gameState.players.forEach(player => {
        for (let i = 0; i < 3; i++) {
            const card = gameState.drawPile.pop();
            player.addCard(card, 'faceDown');
        }
    });
    
    console.log('Dealing face-up cards...');
    gameState.players.forEach(player => {
        for (let i = 0; i < 3; i++) {
            const card = gameState.drawPile.pop();
            player.addCard(card, 'faceUp');
        }
    });
    
    console.log('Dealing hand cards...');
    gameState.players.forEach(player => {
        for (let i = 0; i < 3; i++) {
            const card = gameState.drawPile.pop();
            player.addCard(card, 'hand');
        }
    });
    
    // Log dealing results
    gameState.players.forEach((player, index) => {
        console.log(`${player.name}: Face-down(${player.faceDownCards.length}), Face-up(${player.faceUpCards.length}), Hand(${player.handCards.length})`);
        console.log(`  Face-up cards: ${player.faceUpCards.map(c => c.toString()).join(', ')}`);
    });
    
    console.log(`Cards remaining in draw pile: ${gameState.drawPile.length}`);
    console.log('=== Card Dealing Complete ===');
    
    return true;
}

// Determine first player based on lowest face-up card
function determineFirstPlayer(gameState) {
    let firstPlayerIndex = 0;
    let lowestValue = Infinity;
    let lowestCard = null;
    
    gameState.players.forEach((player, playerIndex) => {
        player.faceUpCards.forEach(card => {
            // Special rule: 3s are lowest, then 4s, etc.
            // We need to invert the getValue() for this check since 3 should be considered lowest
            let checkValue = card.getValue();
            if (card.rank === '3') checkValue = 1; // 3s are lowest
            else if (card.rank === '4') checkValue = 2; // then 4s
            else if (card.rank === '5') checkValue = 3; // then 5s, etc.
            
            if (checkValue < lowestValue) {
                lowestValue = checkValue;
                lowestCard = card;
                firstPlayerIndex = playerIndex;
            }
        });
    });
    
    console.log(`First player: ${gameState.players[firstPlayerIndex].name} (has ${lowestCard?.toString() || 'unknown card'})`);
    gameState.currentPlayerIndex = firstPlayerIndex;
    return firstPlayerIndex;
}

// Initialize decks and deal initial cards (legacy function, now calls enhanced version)
function initializeDecks(gameState) {
    const success = dealInitialCards(gameState);
    if (success) {
        determineFirstPlayer(gameState);
        gameState.gamePhase = GAME_PHASES.EXCHANGE;
    }
    return success;
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
        
        // Check game phase and render appropriate interface
        if (gameState.gamePhase === GAME_PHASES.EXCHANGE) {
            this.renderExchangePhase();
        } else {
            this.renderGameBoard();
        }
        
        this.attachGameEventListeners();
    },
    
    // Render the complete game board layout
    renderGameBoard() {
        const gameArea = document.getElementById('game-area');
        const playerCount = gameState.players.length;
        const currentPlayerIndex = gameState.currentPlayerIndex;
        
        gameArea.innerHTML = `
            <div class="game-board" data-player-count="${playerCount}">
                <!-- Current Player Name Display -->
                <div class="current-player-display">
                    <h3 id="current-player-name">${gameState.getCurrentPlayer().name}'s Turn</h3>
                </div>
                
                <!-- Game Table Layout -->
                <div class="game-table">
                    <!-- Other Players Areas -->
                    <div class="other-players-container">
                        ${this.generateOtherPlayersHTML()}
                    </div>
                    
                    <!-- Center Area (Draw Pile & Discard Pile) -->
                    <div class="center-area">
                        <div class="draw-pile-area">
                            <div class="pile-container">
                                <div id="draw-pile" class="card-pile">
                                    ${this.renderPileArea('draw')}
                                </div>
                                <div class="pile-info">
                                    <span class="pile-count">${gameState.drawPile.length}</span>
                                    <span class="pile-label">Draw</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="discard-pile-area">
                            <div class="pile-container">
                                <div id="discard-pile" class="card-pile">
                                    ${this.renderPileArea('discard')}
                                </div>
                                <div class="pile-info">
                                    <span class="pile-count">${gameState.discardPile.length}</span>
                                    <span class="pile-label">Discard</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Current Player Area (Bottom) -->
                    <div class="current-player-area">
                        <div class="player-section" data-player-index="${currentPlayerIndex}">
                            <h4 class="player-name">${gameState.getCurrentPlayer().name} (You)</h4>
                            
                            <!-- Player's Cards -->
                            <div class="player-cards">
                                <!-- Face-down table cards -->
                                <div class="card-row face-down-row">
                                    <div class="card-row-label">Face Down</div>
                                    <div class="card-container" id="current-player-face-down">
                                        ${this.generatePlayerCardsHTML(gameState.getCurrentPlayer(), 'faceDown', true)}
                                    </div>
                                </div>
                                
                                <!-- Face-up table cards -->
                                <div class="card-row face-up-row">
                                    <div class="card-row-label">Face Up</div>
                                    <div class="card-container" id="current-player-face-up">
                                        ${this.generatePlayerCardsHTML(gameState.getCurrentPlayer(), 'faceUp', true)}
                                    </div>
                                </div>
                                
                                <!-- Hand cards -->
                                <div class="card-row hand-row">
                                    <div class="card-row-label">Hand</div>
                                    <div class="card-container" id="current-player-hand">
                                        ${this.generatePlayerCardsHTML(gameState.getCurrentPlayer(), 'hand', true)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Selection Rules -->
                <div class="selection-rules">
                    <h4>Card Selection Rules:</h4>
                    <ul>
                        <li>Select cards of the <strong>same rank</strong> to play together</li>
                        <li>Must play from <strong>hand cards first</strong> if available</li>
                        <li>Can play <strong>face-up cards</strong> when hand is empty</li>
                        <li>Face-down cards are only playable when no other cards remain</li>
                    </ul>
                </div>
                
                <!-- Control Buttons -->
                <div class="game-controls">
                    <div id="selection-info" class="selection-info">No cards selected</div>
                    <div class="control-buttons">
                        <button id="play-selected-btn" class="control-btn primary" disabled>Play Selected Cards</button>
                        <button id="pick-up-pile-btn" class="control-btn secondary">Pick Up Pile</button>
                        <button id="pass-turn-btn" class="control-btn secondary">Pass to Next Player</button>
                        <button id="clear-selection-btn" class="control-btn tertiary">Clear Selection</button>
                    </div>
                </div>
                
                <!-- Debug Area (temporary) -->
                <div class="debug-area">
                    <button id="toggle-debug" class="debug-toggle">Show Debug</button>
                    <div id="debug-panel" class="debug-panel hidden">
                        <h4>Game State Debug</h4>
                        <div id="game-state-debug"></div>
                        <button id="refresh-state-btn" class="debug-btn">Refresh</button>
                    </div>
                </div>
            </div>
        `;
        
        this.updateGameBoardDisplay();
    },
    
    // Generate HTML for other players (not current player)
    generateOtherPlayersHTML() {
        const currentPlayerIndex = gameState.currentPlayerIndex;
        const otherPlayers = gameState.players.filter((_, index) => index !== currentPlayerIndex);
        const playerCount = gameState.players.length;
        
        return otherPlayers.map((player, relativeIndex) => {
            const actualIndex = gameState.players.findIndex(p => p === player);
            const position = this.getPlayerPosition(relativeIndex, playerCount - 1);
            
            return `
                <div class="other-player ${position}" data-player-index="${actualIndex}">
                    <h4 class="player-name">${player.name}</h4>
                    <div class="player-cards-summary">
                        <div class="card-summary">
                            <span class="card-count">${player.faceDownCards.length}</span>
                            <span class="card-type">Face Down</span>
                        </div>
                        <div class="card-summary">
                            <span class="card-count">${player.faceUpCards.length}</span>
                            <span class="card-type">Face Up</span>
                        </div>
                        <div class="card-summary">
                            <span class="card-count">${player.handCards.length}</span>
                            <span class="card-type">Hand</span>
                        </div>
                    </div>
                    <!-- Show actual face-up cards for other players -->
                    <div class="visible-cards">
                        ${this.generatePlayerCardsHTML(player, 'faceUp', false)}
                    </div>
                </div>
            `;
        }).join('');
    },
    
    // Get position class for other players based on player count
    getPlayerPosition(relativeIndex, totalOthers) {
        if (totalOthers === 1) {
            return 'position-top';
        } else if (totalOthers === 2) {
            return relativeIndex === 0 ? 'position-top-left' : 'position-top-right';
        } else if (totalOthers === 3) {
            const positions = ['position-top', 'position-left', 'position-right'];
            return positions[relativeIndex];
        }
        return 'position-top';
    },
    
    // Generate HTML for a player's cards
    generatePlayerCardsHTML(player, cardType, isCurrentPlayer = false) {
        let cards;
        let faceDown = false;
        let isSelectable = false;
        
        switch(cardType) {
            case 'hand':
                cards = player.handCards;
                isSelectable = isCurrentPlayer; // Only current player can select hand cards
                break;
            case 'faceUp':
                cards = player.faceUpCards;
                isSelectable = isCurrentPlayer; // Only current player can select their face-up cards
                break;
            case 'faceDown':
                cards = player.faceDownCards;
                faceDown = true;
                isSelectable = false; // Face-down cards are never selectable during normal play
                break;
            default:
                return '';
        }
        
        if (cards.length === 0) {
            return '<div class="empty-card-slot">Empty</div>';
        }
        
        return cards.map(card => {
            const cardElement = renderCard(card, faceDown, isSelectable);
            return cardElement.outerHTML;
        }).join('');
    },
    
    // Render pile area (draw or discard)
    renderPileArea(pileType) {
        if (pileType === 'draw') {
            if (gameState.drawPile.length > 0) {
                // Show face-down card for draw pile with count
                const cardHTML = renderCard(gameState.drawPile[gameState.drawPile.length - 1], true).outerHTML;
                return `${cardHTML}<div class="pile-count">${gameState.drawPile.length}</div>`;
            } else {
                return '<div class="empty-pile">Empty Draw Pile</div>';
            }
        } else if (pileType === 'discard') {
            if (gameState.discardPile.length > 0) {
                // Show top card prominently with pile info
                const topCard = gameState.discardPile[gameState.discardPile.length - 1];
                const cardHTML = renderCard(topCard, false).outerHTML;
                const pileInfo = `
                    <div class="pile-info">
                        <div class="pile-count">${gameState.discardPile.length} cards</div>
                        <div class="top-card-info">Top: ${topCard.toString()}</div>
                    </div>
                `;
                return `${cardHTML}${pileInfo}`;
            } else {
                return '<div class="empty-pile">Empty Discard Pile<br><small>Any card can be played</small></div>';
            }
        }
        return '<div class="empty-pile">Empty</div>';
    },
    
    // Update the game board display
    updateGameBoardDisplay() {
        // Update current player name
        const currentPlayerNameEl = document.getElementById('current-player-name');
        if (currentPlayerNameEl) {
            currentPlayerNameEl.textContent = `${gameState.getCurrentPlayer().name}'s Turn`;
        }
        
        // Update pile counts
        const drawPileCount = document.querySelector('.draw-pile-area .pile-count');
        const discardPileCount = document.querySelector('.discard-pile-area .pile-count');
        
        if (drawPileCount) drawPileCount.textContent = gameState.drawPile.length;
        if (discardPileCount) discardPileCount.textContent = gameState.discardPile.length;
        
        // Update pile visuals
        const drawPileElement = document.getElementById('draw-pile');
        const discardPileElement = document.getElementById('discard-pile');
        
        if (drawPileElement) {
            drawPileElement.innerHTML = this.renderPileArea('draw');
        }
        
        if (discardPileElement) {
            discardPileElement.innerHTML = this.renderPileArea('discard');
            
            // Add clickable class if pile has cards and we're in playing phase
            if (gameState.gamePhase === GAME_PHASES.PLAYING && gameState.discardPile.length > 0) {
                discardPileElement.classList.add('clickable');
            } else {
                discardPileElement.classList.remove('clickable');
            }
        }
        
        // Update current player cards
        this.updateCurrentPlayerCards();
        
        // Update debug display if visible
        this.updateGameStateDisplay();
    },
    
    // Update current player's card displays
    updateCurrentPlayerCards() {
        const currentPlayer = gameState.getCurrentPlayer();
        
        const faceDownContainer = document.getElementById('current-player-face-down');
        const faceUpContainer = document.getElementById('current-player-face-up');
        const handContainer = document.getElementById('current-player-hand');
        
        if (faceDownContainer) {
            faceDownContainer.innerHTML = this.generatePlayerCardsHTML(currentPlayer, 'faceDown', true);
        }
        
        if (faceUpContainer) {
            faceUpContainer.innerHTML = this.generatePlayerCardsHTML(currentPlayer, 'faceUp', true);
        }
        
        if (handContainer) {
            handContainer.innerHTML = this.generatePlayerCardsHTML(currentPlayer, 'hand', true);
        }
        
        // Re-attach card selection listeners
        this.attachCardSelectionListeners();
    },
    
    // Exchange Phase Management
    renderExchangePhase() {
        const gameArea = document.getElementById('game-area');
        const currentPlayer = gameState.getCurrentPlayer();
        const currentPlayerIndex = gameState.currentPlayerIndex;
        const totalPlayers = gameState.players.length;
        
        gameArea.innerHTML = `
            <div class="exchange-phase">
                <div class="exchange-header">
                    <h2>Card Exchange Phase</h2>
                    <p class="exchange-subtitle">Players can swap cards between hand and face-up positions</p>
                    <div class="exchange-progress">
                        <span>Player ${currentPlayerIndex + 1} of ${totalPlayers}: <strong>${currentPlayer.name}</strong></span>
                    </div>
                </div>
                
                <div class="exchange-instructions">
                    <div class="instructions-card">
                        <h3>Instructions for ${currentPlayer.name}</h3>
                        <ul>
                            <li>Click a <strong>Hand Card</strong>, then click a <strong>Face-Up Card</strong> to swap them</li>
                            <li>Face-up cards will be visible to all players during the game</li>
                            <li>Choose your face-up cards wisely - other players can see them!</li>
                            <li>Click "Confirm Exchanges" when you're satisfied with your arrangement</li>
                        </ul>
                    </div>
                </div>
                
                <div class="exchange-player-area">
                    <h3>${currentPlayer.name}'s Cards</h3>
                    
                    <div class="exchange-cards">
                        <!-- Hand Cards -->
                        <div class="exchange-row">
                            <div class="card-section-header">
                                <h4>Hand Cards</h4>
                                <p>Click to select for swapping</p>
                            </div>
                            <div class="card-container exchange-hand" id="exchange-hand">
                                ${this.generateExchangeCardsHTML(currentPlayer.handCards, 'hand')}
                            </div>
                        </div>
                        
                        <!-- Face-Up Cards -->
                        <div class="exchange-row">
                            <div class="card-section-header">
                                <h4>Face-Up Cards</h4>
                                <p>Will be visible to all players</p>
                            </div>
                            <div class="card-container exchange-face-up" id="exchange-face-up">
                                ${this.generateExchangeCardsHTML(currentPlayer.faceUpCards, 'faceUp')}
                            </div>
                        </div>
                        
                        <!-- Face-Down Cards (non-interactive) -->
                        <div class="exchange-row">
                            <div class="card-section-header">
                                <h4>Face-Down Cards</h4>
                                <p>Hidden until later in the game</p>
                            </div>
                            <div class="card-container exchange-face-down">
                                ${this.generateExchangeCardsHTML(currentPlayer.faceDownCards, 'faceDown')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="exchange-controls">
                    <button id="confirm-exchanges-btn" class="exchange-btn primary">Confirm Exchanges</button>
                    <button id="reset-exchanges-btn" class="exchange-btn secondary">Reset to Original</button>
                </div>
                
                <!-- Debug Area (temporary) -->
                <div class="debug-area">
                    <button id="toggle-debug" class="debug-toggle">Show Debug</button>
                    <div id="debug-panel" class="debug-panel hidden">
                        <h4>Exchange Debug</h4>
                        <div id="game-state-debug"></div>
                        <button id="refresh-state-btn" class="debug-btn">Refresh</button>
                    </div>
                </div>
            </div>
        `;
        
        this.initializeExchangeState();
        this.updateGameStateDisplay();
    },
    
    // Generate HTML for exchange cards
    generateExchangeCardsHTML(cards, cardType) {
        if (cards.length === 0) {
            return '<div class="empty-card-slot">Empty</div>';
        }
        
        return cards.map(card => {
            const isSelectable = cardType === 'hand' || cardType === 'faceUp';
            const isFaceDown = cardType === 'faceDown';
            const cardElement = renderCard(card, isFaceDown, isSelectable);
            
            if (isSelectable) {
                cardElement.classList.add('exchange-card');
                cardElement.dataset.cardType = cardType;
                cardElement.dataset.cardId = card.id;
            }
            
            return cardElement.outerHTML;
        }).join('');
    },
    
    // Initialize exchange state tracking
    initializeExchangeState() {
        this.exchangeState = {
            selectedCard: null,
            selectedCardType: null,
            originalCards: {
                hand: [...gameState.getCurrentPlayer().handCards],
                faceUp: [...gameState.getCurrentPlayer().faceUpCards]
            }
        };
    },
    
    // Handle card swapping logic
    swapCards(card1Id, type1, card2Id, type2) {
        const currentPlayer = gameState.getCurrentPlayer();
        
        // Find the cards
        const card1 = this.findCardInPlayer(currentPlayer, card1Id);
        const card2 = this.findCardInPlayer(currentPlayer, card2Id);
        
        if (!card1 || !card2) {
            console.error('Could not find cards for swapping');
            return false;
        }
        
        // Remove cards from their current locations
        currentPlayer.removeCard(card1Id, type1);
        currentPlayer.removeCard(card2Id, type2);
        
        // Add cards to their new locations
        currentPlayer.addCard(card1, type2);
        currentPlayer.addCard(card2, type1);
        
        console.log(`Swapped ${card1.toString()} (${type1}) with ${card2.toString()} (${type2})`);
        return true;
    },
    
    // Find a card in a player's collection
    findCardInPlayer(player, cardId) {
        let foundCard = null;
        
        // Search in all card collections
        foundCard = player.handCards.find(card => card.id === cardId);
        if (foundCard) return foundCard;
        
        foundCard = player.faceUpCards.find(card => card.id === cardId);
        if (foundCard) return foundCard;
        
        foundCard = player.faceDownCards.find(card => card.id === cardId);
        return foundCard;
    },
    
    // Reset cards to original state
    resetExchanges() {
        const currentPlayer = gameState.getCurrentPlayer();
        
        // Clear current cards
        currentPlayer.handCards = [...this.exchangeState.originalCards.hand];
        currentPlayer.faceUpCards = [...this.exchangeState.originalCards.faceUp];
        
        // Re-render the exchange interface
        this.updateExchangeDisplay();
        
        console.log('Exchanges reset to original state');
    },
    
    // Update the exchange display
    updateExchangeDisplay() {
        const currentPlayer = gameState.getCurrentPlayer();
        
        const handContainer = document.getElementById('exchange-hand');
        const faceUpContainer = document.getElementById('exchange-face-up');
        
        if (handContainer) {
            handContainer.innerHTML = this.generateExchangeCardsHTML(currentPlayer.handCards, 'hand');
        }
        
        if (faceUpContainer) {
            faceUpContainer.innerHTML = this.generateExchangeCardsHTML(currentPlayer.faceUpCards, 'faceUp');
        }
        
        // Clear any selection state
        this.exchangeState.selectedCard = null;
        this.exchangeState.selectedCardType = null;
        
        // Re-attach event listeners
        this.attachExchangeEventListeners();
    },
    
    // Confirm exchanges and move to next player
    confirmExchanges() {
        console.log(`${gameState.getCurrentPlayer().name} confirmed their exchanges`);
        
        // Move to next player or finish exchange phase
        const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
        
        if (nextPlayerIndex === 0) {
            // All players have completed exchanges
            this.finishExchangePhase();
        } else {
            // Move to next player
            gameState.currentPlayerIndex = nextPlayerIndex;
            this.renderExchangePhase();
        }
    },
    
    // Finish exchange phase and move to playing
    finishExchangePhase() {
        console.log('All players have completed card exchanges');
        
        // Set game phase to playing
        gameState.gamePhase = GAME_PHASES.PLAYING;
        
        // Reset to first player for actual gameplay
        gameState.currentPlayerIndex = 0;
        
        // Render the main game board
        this.renderGameBoard();
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
        // Initialize selection system
        this.initializeSelectedCards();
        
        // Control buttons
        const playSelectedBtn = document.getElementById('play-selected-btn');
        const pickupPileBtn = document.getElementById('pick-up-pile-btn');
        const passTurnBtn = document.getElementById('pass-turn-btn');
        const clearSelectionBtn = document.getElementById('clear-selection-btn');
        
        if (playSelectedBtn) {
            playSelectedBtn.addEventListener('click', () => {
                this.playSelectedCards();
            });
        }
        
        if (pickupPileBtn) {
            pickupPileBtn.addEventListener('click', () => {
                this.pickUpPile();
            });
        }
        
        // Add click functionality to discard pile for pickup
        const discardPileElement = document.getElementById('discard-pile');
        if (discardPileElement) {
            discardPileElement.addEventListener('click', () => {
                // Only allow pickup if there are cards in the pile and it's the playing phase
                if (gameState.gamePhase === GAME_PHASES.PLAYING && gameState.discardPile.length > 0) {
                    this.pickUpPile();
                }
            });
            
            // Add hover effect to indicate clickability
            discardPileElement.style.cursor = 'pointer';
            discardPileElement.title = 'Click to pick up pile';
        }
        
        if (passTurnBtn) {
            passTurnBtn.addEventListener('click', () => {
                this.passTurn();
            });
        }
        
        if (clearSelectionBtn) {
            clearSelectionBtn.addEventListener('click', () => {
                this.clearAllSelections();
            });
        }
        
        // Debug controls
        const toggleDebugBtn = document.getElementById('toggle-debug');
        const refreshBtn = document.getElementById('refresh-state-btn');
        
        if (toggleDebugBtn) {
            toggleDebugBtn.addEventListener('click', () => {
                const debugPanel = document.getElementById('debug-panel');
                const isHidden = debugPanel.classList.contains('hidden');
                
                if (isHidden) {
                    debugPanel.classList.remove('hidden');
                    toggleDebugBtn.textContent = 'Hide Debug';
                    this.updateGameStateDisplay();
                } else {
                    debugPanel.classList.add('hidden');
                    toggleDebugBtn.textContent = 'Show Debug';
                }
            });
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.updateGameStateDisplay();
            });
        }
        
        // Card selection for current player (only for main game)
        if (gameState.gamePhase === GAME_PHASES.PLAYING) {
            this.attachCardSelectionListeners();
        } else if (gameState.gamePhase === GAME_PHASES.EXCHANGE) {
            this.attachExchangeEventListeners();
        }
    },
    
    // Attach exchange phase event listeners
    attachExchangeEventListeners() {
        // Remove any existing exchange listeners to prevent duplicates
        if (this.exchangeClickHandler) {
            document.removeEventListener('click', this.exchangeClickHandler);
        }
        
        // Exchange control buttons
        const confirmBtn = document.getElementById('confirm-exchanges-btn');
        const resetBtn = document.getElementById('reset-exchanges-btn');
        
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.confirmExchanges();
            });
        }
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetExchanges();
            });
        }
        
        // Exchange card selection with proper cleanup
        this.exchangeClickHandler = (e) => {
            const card = e.target.closest('.exchange-card');
            if (card) {
                this.handleExchangeCardClick(card);
            }
        };
        document.addEventListener('click', this.exchangeClickHandler);
        
        // Debug controls
        const toggleDebugBtn = document.getElementById('toggle-debug');
        const refreshBtn = document.getElementById('refresh-state-btn');
        
        if (toggleDebugBtn) {
            toggleDebugBtn.addEventListener('click', () => {
                const debugPanel = document.getElementById('debug-panel');
                const isHidden = debugPanel.classList.contains('hidden');
                
                if (isHidden) {
                    debugPanel.classList.remove('hidden');
                    toggleDebugBtn.textContent = 'Hide Debug';
                    this.updateGameStateDisplay();
                } else {
                    debugPanel.classList.add('hidden');
                    toggleDebugBtn.textContent = 'Show Debug';
                }
            });
        }
        
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.updateGameStateDisplay();
            });
        }
    },
    
    // Handle clicking on exchange cards
    handleExchangeCardClick(cardElement) {
        const cardId = cardElement.dataset.cardId;
        const cardType = cardElement.dataset.cardType;
        
        // Clear previous selections
        document.querySelectorAll('.exchange-card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        
        if (this.exchangeState.selectedCard === null) {
            // First card selection
            this.exchangeState.selectedCard = cardId;
            this.exchangeState.selectedCardType = cardType;
            cardElement.classList.add('selected');
            
            console.log(`Selected ${cardType} card: ${cardId}`);
        } else if (this.exchangeState.selectedCard === cardId) {
            // Deselect the same card
            this.exchangeState.selectedCard = null;
            this.exchangeState.selectedCardType = null;
            
            console.log('Deselected card');
        } else {
            // Second card selection - attempt swap
            const firstCardId = this.exchangeState.selectedCard;
            const firstCardType = this.exchangeState.selectedCardType;
            
            if (firstCardType !== cardType) {
                // Valid swap (different types)
                console.log(`Attempting to swap ${firstCardType} ${firstCardId} with ${cardType} ${cardId}`);
                
                if (this.swapCards(firstCardId, firstCardType, cardId, cardType)) {
                    this.updateExchangeDisplay();
                    this.showExchangeFeedback('Cards swapped successfully!', 'success');
                } else {
                    this.showExchangeFeedback('Failed to swap cards', 'error');
                }
            } else {
                // Invalid swap (same type)
                this.showExchangeFeedback('Cannot swap cards of the same type', 'error');
            }
            
            // Clear selection
            this.exchangeState.selectedCard = null;
            this.exchangeState.selectedCardType = null;
        }
    },
    
    // Show feedback message during exchange
    showExchangeFeedback(message, type = 'info') {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.exchange-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create new feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `exchange-feedback ${type}`;
        feedbackDiv.textContent = message;
        
        const exchangeControls = document.querySelector('.exchange-controls');
        exchangeControls.insertBefore(feedbackDiv, exchangeControls.firstChild);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (feedbackDiv.parentNode) {
                feedbackDiv.remove();
            }
        }, 3000);
    },
    
    // Attach card selection event listeners
    attachCardSelectionListeners() {
        // Remove any existing card selection listeners to prevent duplicates
        if (this.cardSelectionHandler) {
            document.removeEventListener('click', this.cardSelectionHandler);
        }
        
        // Card selection handler for playing phase
        this.cardSelectionHandler = (e) => {
            const card = e.target.closest('.card.face-up');
            if (card && this.isCurrentPlayerCard(card)) {
                this.handleCardSelection(card);
            }
        };
        
        document.addEventListener('click', this.cardSelectionHandler);
    },
    
    // Handle card selection logic
    handleCardSelection(cardElement) {
        const cardId = cardElement.dataset.cardId;
        const currentPlayer = gameState.getCurrentPlayer();
        
        // Check if card is selectable
        if (!this.isCardSelectable(cardElement)) {
            this.showGameFeedback('This card cannot be selected right now', 'error');
            return;
        }
        
        // Toggle selection
        const isSelected = cardElement.classList.contains('selected');
        
        if (isSelected) {
            // Deselect card
            cardElement.classList.remove('selected');
            this.removeFromSelectedCards(cardId);
            console.log(`Deselected card: ${cardId}`);
        } else {
            // Check selection rules before selecting
            if (this.canSelectCard(cardElement)) {
                cardElement.classList.add('selected');
                this.addToSelectedCards(cardId, cardElement);
                console.log(`Selected card: ${cardId}`);
            } else {
                this.showGameFeedback('Cannot select this card with current selection', 'error');
                return;
            }
        }
        
        this.updatePlayButtonState();
        this.updateSelectionDisplay();
    },
    
    // Check if a card can be selected based on game rules
    isCardSelectable(cardElement) {
        const currentPlayer = gameState.getCurrentPlayer();
        
        // Must be current player's card
        if (!this.isCurrentPlayerCard(cardElement)) {
            return false;
        }
        
        // Must be face-up (hand cards or face-up cards)
        if (cardElement.classList.contains('face-down')) {
            return false;
        }
        
        // If player has hand cards, they must play from hand first
        if (currentPlayer.handCards.length > 0) {
            const cardArea = cardElement.closest('.current-player-hand, .current-player-face-up');
            return cardArea && cardArea.classList.contains('current-player-hand');
        }
        
        // If no hand cards, can play face-up cards
        return true;
    },
    
    // Check if card can be selected with current selection (same rank rule)
    canSelectCard(cardElement) {
        const selectedCards = this.getSelectedCards();
        
        // First card can always be selected
        if (selectedCards.length === 0) {
            return true;
        }
        
        // Get card rank
        const cardId = cardElement.dataset.cardId;
        const card = this.findCardById(cardId);
        if (!card) return false;
        
        // All selected cards must have same rank
        const firstSelectedCard = selectedCards[0].card;
        return card.rank === firstSelectedCard.rank;
    },
    
    // Initialize selected cards tracking
    initializeSelectedCards() {
        this.selectedCards = [];
    },
    
    // Add card to selected cards list
    addToSelectedCards(cardId, cardElement) {
        const card = this.findCardById(cardId);
        if (card) {
            this.selectedCards.push({
                id: cardId,
                card: card,
                element: cardElement
            });
        }
    },
    
    // Remove card from selected cards list
    removeFromSelectedCards(cardId) {
        this.selectedCards = this.selectedCards.filter(item => item.id !== cardId);
    },
    
    // Get currently selected cards
    getSelectedCards() {
        return this.selectedCards || [];
    },
    
    // Find card by ID in current player's collection
    findCardById(cardId) {
        const currentPlayer = gameState.getCurrentPlayer();
        if (!currentPlayer) return null;
        
        // Search in all card collections
        let foundCard = currentPlayer.handCards.find(card => card.id === cardId);
        if (foundCard) return foundCard;
        
        foundCard = currentPlayer.faceUpCards.find(card => card.id === cardId);
        if (foundCard) return foundCard;
        
        foundCard = currentPlayer.faceDownCards.find(card => card.id === cardId);
        return foundCard;
    },
    
    // Update selection display
    updateSelectionDisplay() {
        const selectedCards = this.getSelectedCards();
        const selectionInfo = document.getElementById('selection-info');
        
        if (selectionInfo) {
            if (selectedCards.length === 0) {
                selectionInfo.textContent = 'No cards selected';
                selectionInfo.className = 'selection-info';
            } else {
                const cardNames = selectedCards.map(item => item.card.toString()).join(', ');
                selectionInfo.textContent = `Selected: ${cardNames} (${selectedCards.length} card${selectedCards.length > 1 ? 's' : ''})`;
                selectionInfo.className = 'selection-info active';
            }
        }
    },
    
    // Clear all selections
    clearAllSelections() {
        // Remove visual selection from all cards
        document.querySelectorAll('.card.selected').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Clear selection tracking
        this.selectedCards = [];
        this.updatePlayButtonState();
        this.updateSelectionDisplay();
        
        console.log('All card selections cleared');
    },
    
    // Show game feedback message
    showGameFeedback(message, type = 'info') {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.game-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Create new feedback message
        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = `game-feedback ${type}`;
        feedbackDiv.innerHTML = message; // Use innerHTML to support emojis and formatting
        
        const controlsArea = document.querySelector('.game-controls');
        if (controlsArea) {
            controlsArea.insertBefore(feedbackDiv, controlsArea.firstChild);
            
            // Special effects get longer display time
            const displayTime = type === 'special' ? 4000 : 3000;
            
            // Auto-remove after specified time
            setTimeout(() => {
                if (feedbackDiv.parentNode) {
                    feedbackDiv.remove();
                }
            }, displayTime);
        }
    },
    
    // Check if a card belongs to the current player
    isCurrentPlayerCard(cardElement) {
        const playerArea = cardElement.closest('.current-player-area, .current-player-hand, .current-player-face-up');
        return playerArea !== null;
    },
    
    // Update play button state based on selected cards
    updatePlayButtonState() {
        const selectedCards = this.getSelectedCards();
        const playBtn = document.getElementById('play-selected-btn');
        
        if (playBtn) {
            playBtn.disabled = selectedCards.length === 0;
        }
    },
    
    // Play selected cards
    playSelectedCards() {
        const selectedCards = this.getSelectedCards();
        
        if (selectedCards.length === 0) {
            this.showGameFeedback('No cards selected to play', 'error');
            return;
        }
        
        // Validate the play
        const validationResult = this.validateCardPlay(selectedCards);
        if (!validationResult.valid) {
            this.showGameFeedback(validationResult.message, 'error');
            return;
        }
        
        console.log(`Playing ${selectedCards.length} cards:`, selectedCards.map(item => item.card.toString()));
        
        // Execute the play
        this.executeCardPlay(selectedCards);
        
        // Clear selection after playing
        this.clearAllSelections();
    },
    
    // Validate if selected cards can be played
    validateCardPlay(selectedCards) {
        if (selectedCards.length === 0) {
            return { valid: false, message: 'No cards selected' };
        }
        
        // Check if all cards are same rank (already enforced by selection, but double-check)
        const firstRank = selectedCards[0].card.rank;
        const allSameRank = selectedCards.every(item => item.card.rank === firstRank);
        if (!allSameRank) {
            return { valid: false, message: 'All selected cards must be the same rank' };
        }
        
        // Get top card of discard pile
        const topDiscardCard = gameState.discardPile.length > 0 ? 
            gameState.discardPile[gameState.discardPile.length - 1] : null;
        
        // If discard pile is empty, any card can be played
        if (!topDiscardCard) {
            return { valid: true, message: 'Valid play on empty pile' };
        }
        
        // Check if cards can be played on top of discard pile
        return this.canPlayOnCard(selectedCards[0].card, topDiscardCard);
    },
    
    // Check if a card can be played on top of another card
    canPlayOnCard(playCard, topCard) {
        const playValue = playCard.getValue();
        const topValue = topCard.getValue();
        
        // Special rules for Threes card game:
        // 2s are wild and can be played on anything
        if (playCard.rank === '2') {
            return { valid: true, message: '2s are wild cards' };
        }
        
        // 10s can be played on anything and clear the pile
        if (playCard.rank === '10') {
            return { valid: true, message: '10s clear the pile' };
        }
        
        // 3s can only be played on 3s or lower (or 2s)
        if (playCard.rank === '3') {
            if (topCard.rank === '2' || topCard.rank === '3') {
                return { valid: true, message: 'Valid 3 play' };
            }
            return { valid: false, message: '3s can only be played on 2s or 3s' };
        }
        
        // For other cards, must be equal or higher value
        if (playValue >= topValue) {
            return { valid: true, message: 'Valid play - equal or higher value' };
        }
        
        return { valid: false, message: `Cannot play ${playCard.rank} on ${topCard.rank}` };
    },
    
    // Execute the card play with face-down card handling
    executeCardPlay(selectedCards) {
        const currentPlayer = gameState.getCurrentPlayer();
        const cardNames = selectedCards.map(item => item.card.toString()).join(', ');
        
        // Check if this is a face-down card play (blind play)
        const isFaceDownPlay = selectedCards.some(item => 
            currentPlayer.faceDownCards.find(c => c.id === item.id)
        );
        
        if (isFaceDownPlay) {
            return this.handleFaceDownCardPlay(selectedCards);
        }
        
        // Remove cards from player's collection
        selectedCards.forEach(item => {
            // Find which collection the card is in
            if (currentPlayer.handCards.find(c => c.id === item.id)) {
                currentPlayer.removeCard(item.id, 'hand');
            } else if (currentPlayer.faceUpCards.find(c => c.id === item.id)) {
                currentPlayer.removeCard(item.id, 'faceUp');
            } else if (currentPlayer.faceDownCards.find(c => c.id === item.id)) {
                currentPlayer.removeCard(item.id, 'faceDown');
            }
        });
        
        // Add cards to discard pile
        selectedCards.forEach(item => {
            gameState.discardPile.push(item.card);
        });
        
        console.log(`${currentPlayer.name} played: ${cardNames}`);
        this.showGameFeedback(`Played: ${cardNames}`, 'success');
        
        // Check for special effects
        const specialEffect = this.checkSpecialEffects(selectedCards);
        
        if (specialEffect.effect) {
            this.handleSpecialEffect(specialEffect);
        } else {
            // Normal play - replenish hand and check turn progression
            this.replenishHand();
            this.checkTurnProgression();
        }
        
        // Update display
        this.updateGameBoardDisplay();
    },
    
    // Handle face-down card plays (blind plays)
    handleFaceDownCardPlay(selectedCards) {
        const currentPlayer = gameState.getCurrentPlayer();
        const playedCard = selectedCards[0].card;
        
        console.log(`${currentPlayer.name} plays face-down card: ${playedCard.toString()}`);
        this.showGameFeedback(`${currentPlayer.name} plays face-down: ${playedCard.toString()}`, 'info');
        
        // Remove the face-down card from player
        currentPlayer.removeCard(selectedCards[0].id, 'faceDown');
        
        // Validate if the blind play is legal
        const topDiscardCard = gameState.discardPile.length > 0 ? 
            gameState.discardPile[gameState.discardPile.length - 1] : null;
        
        let validPlay = true;
        if (topDiscardCard) {
            const validationResult = this.canPlayOnCard(playedCard, topDiscardCard);
            validPlay = validationResult.valid;
        }
        
        if (validPlay) {
            // Successful blind play
            gameState.discardPile.push(playedCard);
            this.showGameFeedback(`🎯 Lucky! ${playedCard.toString()} plays successfully!`, 'success');
            
            // Check for special effects
            const specialEffect = this.checkSpecialEffects(selectedCards);
            if (specialEffect.effect) {
                this.handleSpecialEffect(specialEffect);
            } else {
                this.replenishHand();
                this.checkTurnProgression();
            }
        } else {
            // Failed blind play - player must pick up pile plus the failed card
            this.showGameFeedback(`💥 ${playedCard.toString()} doesn't play! Pick up the pile!`, 'error');
            
            // Add the failed card to discard pile first
            gameState.discardPile.push(playedCard);
            
            // Force player to pick up the entire pile
            this.pickUpPile();
        }
        
        // Update display
        this.updateGameBoardDisplay();
    },
    
    // Enhanced special card effects detection
    checkSpecialEffects(playedCards) {
        const firstCard = playedCards[0].card;
        
        // 10s clear the pile - highest priority
        if (firstCard.rank === '10') {
            return this.handle10Effect();
        }
        
        // Check for four of a kind on discard pile - second priority
        if (this.checkFourOfAKind()) {
            return this.handleFourOfAKindEffect();
        }
        
        // 2s are wild cards - third priority
        if (firstCard.rank === '2') {
            return this.handle2sEffect();
        }
        
        return { effect: null };
    },
    
    // Handle 2s effect (wild cards)
    handle2sEffect() {
        return { 
            effect: 'wild', 
            message: '🃏 2s are WILD! Next player can play any card',
            continueTurn: false,
            visualEffect: 'wild-card-played'
        };
    },
    
    // Handle 10s effect (pile clear)
    handle10Effect() {
        return { 
            effect: 'pile_clear', 
            message: '💥 10s CLEAR the pile! Play again!',
            continueTurn: true,
            visualEffect: 'pile-cleared'
        };
    },
    
    // Handle four of a kind effect (pile clear)
    handleFourOfAKindEffect() {
        return { 
            effect: 'four_of_kind', 
            message: '🔥 FOUR OF A KIND! Pile cleared! Play again!',
            continueTurn: true,
            visualEffect: 'four-of-kind-cleared'
        };
    },
    
    // Check if top 4 cards of discard pile are same rank
    checkFourOfAKind() {
        if (gameState.discardPile.length < 4) return false;
        
        const topFour = gameState.discardPile.slice(-4);
        const firstRank = topFour[0].rank;
        
        return topFour.every(card => card.rank === firstRank);
    },
    
    // Enhanced special effects handler
    handleSpecialEffect(specialEffect) {
        console.log('Special effect triggered:', specialEffect.effect);
        
        // Show enhanced visual feedback
        this.showSpecialEffectFeedback(specialEffect);
        
        // Handle pile clearing effects
        if (specialEffect.effect === 'pile_clear' || specialEffect.effect === 'four_of_kind') {
            this.clearDiscardPile();
        }
        
        // Handle turn continuation
        if (specialEffect.continueTurn) {
            // Player gets another turn - replenish hand but don't pass turn
            console.log(`${gameState.getCurrentPlayer().name} gets another turn!`);
            this.replenishHand();
            this.showGameFeedback(`${gameState.getCurrentPlayer().name} plays again!`, 'success');
        } else {
            // Normal turn progression
            this.replenishHand();
            this.checkTurnProgression();
        }
    },
    
    // Clear discard pile (remove from play, not to hand)
    clearDiscardPile() {
        const clearedCount = gameState.discardPile.length;
        gameState.discardPile = [];
        
        console.log(`Discard pile cleared - ${clearedCount} cards removed from play`);
        
        // Update display immediately
        this.updateGameBoardDisplay();
        
        // Show visual effect
        this.showPileClearEffect();
        
        return clearedCount;
    },
    
    // Show enhanced feedback for special effects
    showSpecialEffectFeedback(specialEffect) {
        // Show the main message
        this.showGameFeedback(specialEffect.message, 'special');
        
        // Add visual effects based on effect type
        if (specialEffect.visualEffect) {
            this.triggerVisualEffect(specialEffect.visualEffect);
        }
    },
    
    // Trigger visual effects for special cards
    triggerVisualEffect(effectType) {
        const pileArea = document.getElementById('discard-pile');
        if (!pileArea) return;
        
        // Remove any existing effect classes
        pileArea.classList.remove('pile-cleared', 'wild-played', 'four-of-kind');
        
        // Add appropriate effect class
        switch (effectType) {
            case 'pile-cleared':
                pileArea.classList.add('pile-cleared');
                break;
            case 'wild-card-played':
                pileArea.classList.add('wild-played');
                break;
            case 'four-of-kind-cleared':
                pileArea.classList.add('four-of-kind');
                break;
        }
        
        // Remove effect class after animation
        setTimeout(() => {
            pileArea.classList.remove('pile-cleared', 'wild-played', 'four-of-kind');
        }, 1500);
    },
    
    // Show pile clear visual effect
    showPileClearEffect() {
        const pileArea = document.getElementById('discard-pile');
        if (pileArea) {
            pileArea.classList.add('pile-clearing');
            setTimeout(() => {
                pileArea.classList.remove('pile-clearing');
            }, 800);
        }
    },
    
    // Replenish player's hand from draw pile
    replenishHand() {
        const currentPlayer = gameState.getCurrentPlayer();
        const targetHandSize = 3;
        
        // Only replenish if player has hand cards (not playing face-up/face-down only)
        if (currentPlayer.handCards.length === 0 && currentPlayer.faceUpCards.length > 0) {
            // Player is now playing face-up cards, no hand replenishment
            console.log(`${currentPlayer.name} is now playing face-up cards`);
            return;
        }
        
        if (currentPlayer.handCards.length === 0 && currentPlayer.faceUpCards.length === 0) {
            // Player is now playing face-down cards, no hand replenishment
            console.log(`${currentPlayer.name} is now playing face-down cards`);
            return;
        }
        
        // Replenish hand to target size
        while (currentPlayer.handCards.length < targetHandSize && gameState.drawPile.length > 0) {
            const drawnCard = gameState.drawPile.pop();
            currentPlayer.addCard(drawnCard, 'hand');
            console.log(`${currentPlayer.name} drew: ${drawnCard.toString()}`);
        }
        
        if (currentPlayer.handCards.length < targetHandSize && gameState.drawPile.length === 0) {
            console.log('Draw pile is empty - no more cards to draw');
        }
    },
    
    // Enhanced turn progression with detailed player finishing logic
    checkTurnProgression() {
        const currentPlayer = gameState.getCurrentPlayer();
        
        // Check if player has finished using enhanced logic
        if (this.checkPlayerFinished(currentPlayer)) {
            this.handlePlayerFinished(currentPlayer);
            
            // Check if game is over
            if (gameState.checkGameOver()) {
                this.handleGameOver();
                return;
            }
        }
        
        // Move to next player
        this.passTurn();
    },
    
    // Enhanced player finishing check with face-down card rules
    checkPlayerFinished(player) {
        const totalCards = player.getCardCount();
        
        if (totalCards === 0) {
            console.log(`${player.name} has no cards left - finished!`);
            return true;
        }
        
        // Special case: If player only has face-down cards and just played their last face-up card
        if (player.handCards.length === 0 && player.faceUpCards.length === 0 && player.faceDownCards.length > 0) {
            console.log(`${player.name} is now playing face-down cards (blind)`);
            // Player continues with face-down cards - not finished yet
            return false;
        }
        
        return false;
    },
    
    // Handle when a player finishes the game
    handlePlayerFinished(player) {
        console.log(`🎉 ${player.name} has finished the game!`);
        
        player.hasFinished = true;
        player.isActive = false;
        
        // Show celebration message
        this.showGameFeedback(`🎉 ${player.name} finished! Well played!`, 'success');
        
        // Update player display to show finished status
        this.updatePlayerFinishedStatus(player);
        
        // Log remaining active players
        const activePlayers = gameState.players.filter(p => p.isActive);
        console.log(`Remaining active players: ${activePlayers.map(p => p.name).join(', ')}`);
    },
    
    // Update UI to show player finished status
    updatePlayerFinishedStatus(player) {
        // Find player's area in the DOM and gray it out
        const playerAreas = document.querySelectorAll('.other-player');
        playerAreas.forEach(area => {
            const playerNameEl = area.querySelector('.player-name');
            if (playerNameEl && playerNameEl.textContent === player.name) {
                area.classList.add('player-finished');
                
                // Add finished indicator
                if (!area.querySelector('.finished-indicator')) {
                    const finishedIndicator = document.createElement('div');
                    finishedIndicator.className = 'finished-indicator';
                    finishedIndicator.innerHTML = '✅ FINISHED';
                    area.appendChild(finishedIndicator);
                }
            }
        });
    },
    
    // Enhanced game over handling with proper end screen
    handleGameOver() {
        const remainingPlayers = gameState.players.filter(p => p.isActive);
        const finishedPlayers = gameState.players.filter(p => p.hasFinished);
        const loser = remainingPlayers.length === 1 ? remainingPlayers[0] : null;
        
        console.log('🏁 GAME OVER!');
        gameState.gamePhase = GAME_PHASES.GAME_OVER;
        
        // Disable all controls
        this.setControlButtonsEnabled(false);
        
        // Create and show game over screen
        this.showGameOverScreen(finishedPlayers, loser);
        
        // Log final results
        console.log('=== FINAL RESULTS ===');
        finishedPlayers.forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} - FINISHED`);
        });
        if (loser) {
            console.log(`💩 ${loser.name} - THE SHITHEAD!`);
        }
        console.log('===================');
    },
    
    // Create and display game over screen
    showGameOverScreen(finishedPlayers, loser) {
        // Create game over overlay
        const gameOverOverlay = document.createElement('div');
        gameOverOverlay.id = 'game-over-overlay';
        gameOverOverlay.className = 'game-over-overlay';
        
        // Build results HTML
        let resultsHTML = '<div class="game-over-results">';
        
        // Show finished players in order
        if (finishedPlayers.length > 0) {
            resultsHTML += '<h3>🏆 Finished Players</h3>';
            finishedPlayers.forEach((player, index) => {
                const position = index + 1;
                const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '🏅';
                resultsHTML += `<div class="result-item finished">${medal} ${position}. ${player.name}</div>`;
            });
        }
        
        // Show the loser (Shithead)
        if (loser) {
            resultsHTML += '<h3>💩 The Shithead</h3>';
            resultsHTML += `<div class="result-item loser">💩 ${loser.name}</div>`;
        }
        
        resultsHTML += '</div>';
        
        gameOverOverlay.innerHTML = `
            <div class="game-over-content">
                <h1>🏁 GAME OVER!</h1>
                ${resultsHTML}
                <div class="game-over-actions">
                    <button id="new-game-btn" class="new-game-btn">New Game</button>
                    <button id="view-board-btn" class="view-board-btn">View Final Board</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(gameOverOverlay);
        
        // Add event listeners
        const newGameBtn = document.getElementById('new-game-btn');
        const viewBoardBtn = document.getElementById('view-board-btn');
        
        newGameBtn.addEventListener('click', () => {
            this.startNewGame();
        });
        
        viewBoardBtn.addEventListener('click', () => {
            gameOverOverlay.remove();
        });
        
        console.log('Game over screen displayed');
    },
    
    // Start a new game
    startNewGame() {
        // Remove game over overlay
        const overlay = document.getElementById('game-over-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Reset to setup screen
        document.getElementById('game-area').style.display = 'none';
        document.getElementById('setup-screen').style.display = 'block';
        
        // Reset game state
        gameState = new GameState();
        
        console.log('Starting new game...');
    },
    
    // Pick up the discard pile
    pickUpPile() {
        const currentPlayer = gameState.getCurrentPlayer();
        const discardPileSize = gameState.discardPile.length;
        
        if (discardPileSize === 0) {
            this.showGameFeedback('No cards in discard pile to pick up', 'error');
            return;
        }
        
        console.log(`${currentPlayer.name} picks up ${discardPileSize} cards from discard pile`);
        
        // Show pickup feedback immediately for large piles
        if (discardPileSize > 5) {
            this.showGameFeedback(`Picking up ${discardPileSize} cards...`, 'info');
        }
        
        // Move all discard pile cards to player's hand efficiently
        const pickedUpCards = [...gameState.discardPile];
        
        // Batch add cards to avoid multiple DOM updates
        pickedUpCards.forEach(card => {
            currentPlayer.addCard(card, 'hand');
        });
        
        // Clear discard pile
        gameState.discardPile = [];
        
        console.log(`${currentPlayer.name} picked up ${pickedUpCards.length} cards`);
        
        // Show completion message
        const message = discardPileSize === 1 ? 
            'Picked up 1 card from discard pile' : 
            `Picked up ${pickedUpCards.length} cards from discard pile`;
        this.showGameFeedback(message, 'info');
        
        // Clear any selections
        this.clearAllSelections();
        
        // Pass turn to next player
        this.passTurn();
        
        // Update display
        this.updateGameBoardDisplay();
    },
    
    // Pass turn to next player with smooth transitions
    passTurn() {
        const currentPlayer = gameState.getCurrentPlayer();
        console.log(`${currentPlayer.name} passes their turn`);
        
        // Clear any selections
        this.clearAllSelections();
        
        // Hide current player's cards and show transition
        this.hideCurrentPlayer();
        
        // Move to next player
        gameState.nextPlayer();
        
        // Show transition screen
        this.showTurnTransition();
    },
    
    // Hide current player's hand cards
    hideCurrentPlayer() {
        const handContainer = document.getElementById('current-player-hand');
        if (handContainer) {
            handContainer.style.opacity = '0.3';
            handContainer.style.pointerEvents = 'none';
        }
        
        // Disable control buttons
        this.setControlButtonsEnabled(false);
        
        console.log('Current player cards hidden');
    },
    
    // Show next player transition screen
    showTurnTransition() {
        const nextPlayer = gameState.getCurrentPlayer();
        
        // Create transition overlay
        const transitionOverlay = document.createElement('div');
        transitionOverlay.id = 'turn-transition-overlay';
        transitionOverlay.className = 'turn-transition-overlay';
        transitionOverlay.innerHTML = `
            <div class="turn-transition-content">
                <h2>Turn Change</h2>
                <p class="current-player-name">${nextPlayer.name}'s Turn</p>
                <p class="transition-instruction">Click to continue</p>
                <button id="continue-turn-btn" class="continue-turn-btn">Continue</button>
            </div>
        `;
        
        document.body.appendChild(transitionOverlay);
        
        // Add click handler to continue
        const continueBtn = document.getElementById('continue-turn-btn');
        continueBtn.addEventListener('click', () => {
            this.showNextPlayer();
        });
        
        // Also allow clicking anywhere on overlay to continue
        transitionOverlay.addEventListener('click', (e) => {
            if (e.target === transitionOverlay) {
                this.showNextPlayer();
            }
        });
        
        console.log(`Showing transition to ${nextPlayer.name}`);
    },
    
    // Show next player's cards and enable controls
    showNextPlayer() {
        // Remove transition overlay
        const overlay = document.getElementById('turn-transition-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Re-render board for new player
        this.renderGameBoard();
        
        // Show current player's cards
        const handContainer = document.getElementById('current-player-hand');
        if (handContainer) {
            handContainer.style.opacity = '1';
            handContainer.style.pointerEvents = 'auto';
        }
        
        // Enable control buttons
        this.setControlButtonsEnabled(true);
        
        // Update UI state for new player
        this.resetUIStateForNewPlayer();
        
        const currentPlayer = gameState.getCurrentPlayer();
        this.showGameFeedback(`${currentPlayer.name}'s turn`, 'info');
        
        console.log(`${currentPlayer.name} can now play`);
    },
    
    // Enable/disable control buttons
    setControlButtonsEnabled(enabled) {
        const buttons = [
            'play-selected-btn',
            'pick-up-pile-btn', 
            'pass-turn-btn',
            'clear-selection-btn'
        ];
        
        buttons.forEach(buttonId => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.disabled = !enabled;
                if (enabled) {
                    button.classList.remove('disabled');
                } else {
                    button.classList.add('disabled');
                }
            }
        });
    },
    
    // Reset UI state for new player
    resetUIStateForNewPlayer() {
        // Clear any existing selections
        this.clearAllSelections();
        
        // Reset button states
        this.updatePlayButtonState();
        
        // Update current player display
        const currentPlayerNameEl = document.getElementById('current-player-name');
        if (currentPlayerNameEl) {
            currentPlayerNameEl.textContent = `${gameState.getCurrentPlayer().name}'s Turn`;
        }
        
        // Re-attach event listeners for new player
        this.attachCardSelectionListeners();
        
        console.log('UI state reset for new player');
    }
};

// Basic initialization
document.addEventListener('DOMContentLoaded', function() {
    setupScreen.init();
}); 