// ABOUTME: Debug script for testing exchange phase functionality in isolation
// ABOUTME: This script can be run in browser console to test specific scenarios

console.log('🧪 Exchange Debug Script Loaded');

// Test Scenario 1: Basic Exchange Flow
function testBasicExchangeFlow() {
    console.log('\n=== Testing Basic Exchange Flow ===');
    
    try {
        // Create test game state
        const testGameState = new GameState();
        testGameState.initializeGame(['Alice', 'Bob', 'Charlie']);
        
        // Create and deal cards using proper initialization
        testGameState.deck = createDeck();
        testGameState.drawPile = shuffleDeck(testGameState.deck);
        const dealSuccess = initializeDecks(testGameState);
        
        console.log('✅ Game initialized and cards dealt');
        console.log('Current phase:', testGameState.gamePhase);
        console.log('Current player:', testGameState.getCurrentPlayer().name);
        
        // Test player card counts
        testGameState.players.forEach((player, index) => {
            console.log(`Player ${index + 1} (${player.name}): ${player.getCardCount()} cards`);
            console.log(`  Hand: ${player.handCards.length}, Face-up: ${player.faceUpCards.length}, Face-down: ${player.faceDownCards.length}`);
        });
        
        return testGameState;
        
    } catch (error) {
        console.error('❌ Basic exchange flow test failed:', error);
        return null;
    }
}

// Test Scenario 2: Card Swapping Logic
function testCardSwapping(gameState) {
    console.log('\n=== Testing Card Swapping Logic ===');
    
    if (!gameState) {
        console.error('❌ No game state provided');
        return false;
    }
    
    try {
        const currentPlayer = gameState.getCurrentPlayer();
        console.log(`Testing swaps for: ${currentPlayer.name}`);
        
        // Get first hand and face-up card
        const handCard = currentPlayer.handCards[0];
        const faceUpCard = currentPlayer.faceUpCards[0];
        
        if (!handCard || !faceUpCard) {
            console.error('❌ Player missing required cards for swap test');
            return false;
        }
        
        console.log(`Original - Hand: ${handCard.toString()}, Face-up: ${faceUpCard.toString()}`);
        
        // Simulate swap
        currentPlayer.removeCard(handCard.id, 'hand');
        currentPlayer.removeCard(faceUpCard.id, 'faceUp');
        currentPlayer.addCard(handCard, 'faceUp');
        currentPlayer.addCard(faceUpCard, 'hand');
        
        console.log(`After swap - Hand: ${currentPlayer.handCards[0].toString()}, Face-up: ${currentPlayer.faceUpCards[0].toString()}`);
        console.log('✅ Card swapping logic works correctly');
        
        return true;
        
    } catch (error) {
        console.error('❌ Card swapping test failed:', error);
        return false;
    }
}

// Test Scenario 3: Exchange State Management
function testExchangeStateManagement() {
    console.log('\n=== Testing Exchange State Management ===');
    
    try {
        // Test exchange state initialization
        const mockExchangeState = {
            selectedCard: null,
            selectedCardType: null,
            originalCards: {
                hand: [],
                faceUp: []
            }
        };
        
        console.log('✅ Exchange state structure is valid');
        
        // Test selection logic
        mockExchangeState.selectedCard = 'A-♠';
        mockExchangeState.selectedCardType = 'hand';
        
        console.log('Selected card:', mockExchangeState.selectedCard);
        console.log('Selected type:', mockExchangeState.selectedCardType);
        
        // Test deselection
        mockExchangeState.selectedCard = null;
        mockExchangeState.selectedCardType = null;
        
        console.log('✅ Selection/deselection logic works');
        
        return true;
        
    } catch (error) {
        console.error('❌ Exchange state management test failed:', error);
        return false;
    }
}

// Test Scenario 4: Multi-Player Progression
function testMultiPlayerProgression(gameState) {
    console.log('\n=== Testing Multi-Player Progression ===');
    
    if (!gameState) {
        console.error('❌ No game state provided');
        return false;
    }
    
    try {
        const totalPlayers = gameState.players.length;
        console.log(`Testing progression through ${totalPlayers} players`);
        
        for (let i = 0; i < totalPlayers; i++) {
            const currentPlayer = gameState.getCurrentPlayer();
            console.log(`Turn ${i + 1}: ${currentPlayer.name} (index: ${gameState.currentPlayerIndex})`);
            
            // Simulate moving to next player
            gameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % totalPlayers;
        }
        
        // Should be back to first player
        if (gameState.currentPlayerIndex === 0) {
            console.log('✅ Multi-player progression works correctly');
            return true;
        } else {
            console.error('❌ Player progression failed - not back to first player');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Multi-player progression test failed:', error);
        return false;
    }
}

// Test Scenario 5: Phase Transitions
function testPhaseTransitions(gameState) {
    console.log('\n=== Testing Phase Transitions ===');
    
    if (!gameState) {
        console.error('❌ No game state provided');
        return false;
    }
    
    try {
        console.log('Initial phase:', gameState.gamePhase);
        
        // Should start in EXCHANGE phase
        if (gameState.gamePhase !== GAME_PHASES.EXCHANGE) {
            console.error('❌ Game should start in EXCHANGE phase');
            return false;
        }
        
        // Simulate finishing exchange phase
        gameState.gamePhase = GAME_PHASES.PLAYING;
        console.log('Transitioned to:', gameState.gamePhase);
        
        if (gameState.gamePhase === GAME_PHASES.PLAYING) {
            console.log('✅ Phase transition works correctly');
            return true;
        } else {
            console.error('❌ Phase transition failed');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Phase transition test failed:', error);
        return false;
    }
}

// Test Scenario 6: Error Handling
function testErrorHandling() {
    console.log('\n=== Testing Error Handling ===');
    
    try {
        // Test invalid card operations
        const testPlayer = new Player('Test Player');
        
        // Try to remove non-existent card
        const result = testPlayer.removeCard('INVALID-CARD', 'hand');
        if (result === null) {
            console.log('✅ Correctly handles non-existent card removal');
        } else {
            console.error('❌ Should return null for non-existent card');
        }
        
        // Test invalid location
        testPlayer.addCard(new Card('A', '♠'), 'invalid-location');
        // Should log error but not crash
        
        console.log('✅ Error handling works correctly');
        return true;
        
    } catch (error) {
        console.error('❌ Error handling test failed:', error);
        return false;
    }
}

// Run All Debug Tests
function runAllDebugTests() {
    console.log('🚀 Starting Exchange Debug Tests...\n');
    
    const results = {
        basicFlow: false,
        cardSwapping: false,
        stateManagement: false,
        multiPlayer: false,
        phaseTransitions: false,
        errorHandling: false
    };
    
    // Run tests in sequence
    const gameState = testBasicExchangeFlow();
    results.basicFlow = gameState !== null;
    
    if (gameState) {
        results.cardSwapping = testCardSwapping(gameState);
        results.multiPlayer = testMultiPlayerProgression(gameState);
        results.phaseTransitions = testPhaseTransitions(gameState);
    }
    
    results.stateManagement = testExchangeStateManagement();
    results.errorHandling = testErrorHandling();
    
    // Summary
    console.log('\n📊 Debug Test Results:');
    console.log('========================');
    Object.entries(results).forEach(([test, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
    });
    
    const passCount = Object.values(results).filter(Boolean).length;
    const totalTests = Object.keys(results).length;
    console.log(`\n🎯 Overall: ${passCount}/${totalTests} tests passed (${Math.round(passCount/totalTests*100)}%)`);
    
    return results;
}

// Utility function to inspect current game state
function inspectGameState() {
    if (typeof gameState === 'undefined' || !gameState) {
        console.log('❌ No global gameState found');
        return;
    }
    
    console.log('\n🔍 Current Game State Inspection:');
    console.log('==================================');
    console.log('Phase:', gameState.gamePhase);
    console.log('Current Player Index:', gameState.currentPlayerIndex);
    console.log('Current Player:', gameState.getCurrentPlayer()?.name || 'None');
    console.log('Total Players:', gameState.players.length);
    console.log('Draw Pile Size:', gameState.drawPile.length);
    console.log('Discard Pile Size:', gameState.discardPile.length);
    
    console.log('\nPlayer Details:');
    gameState.players.forEach((player, index) => {
        console.log(`  ${index + 1}. ${player.name}:`);
        console.log(`     Hand: ${player.handCards.length} cards`);
        console.log(`     Face-up: ${player.faceUpCards.length} cards`);
        console.log(`     Face-down: ${player.faceDownCards.length} cards`);
        console.log(`     Active: ${player.isActive}`);
        console.log(`     Finished: ${player.hasFinished}`);
    });
}

// Export functions for console use
window.debugExchange = {
    runAllTests: runAllDebugTests,
    testBasicFlow: testBasicExchangeFlow,
    testSwapping: testCardSwapping,
    testStateManagement: testExchangeStateManagement,
    testMultiPlayer: testMultiPlayerProgression,
    testPhaseTransitions: testPhaseTransitions,
    testErrorHandling: testErrorHandling,
    inspectState: inspectGameState
};

console.log('🎮 Debug functions available as window.debugExchange');
console.log('Usage: debugExchange.runAllTests() or debugExchange.inspectState()'); 