// ABOUTME: This file contains the core game logic for the Threes card game web application
// ABOUTME: It includes card management, game state, player logic, and all interactive functionality

// Card data structures and constants
const CARD_RANKS = ['2', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
const CARD_SUITS = ['♠', '♥', '♦', '♣'];

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
    
    // Create test display
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
    
    // Add click event to test card selection
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card.face-up')) {
            const card = e.target.closest('.card');
            card.classList.toggle('selected');
        }
    });
}); 