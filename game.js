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
    
    // Get card display string
    toString() {
        return `${this.rank}${this.suit}`;
    }
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
    
    // Test card creation
    const testCard = createCard('A', '♠');
    console.log('Test card created:', testCard.toString());
    
    // Update the app container to show we're ready
    const app = document.getElementById('app');
    app.innerHTML = `
        <h1>Threes Card Game</h1>
        <p>Game foundation loaded successfully!</p>
        <p>Test card: ${testCard.toString()}</p>
    `;
}); 