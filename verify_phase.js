// ABOUTME: Simple verification script to test phase transition logic
// ABOUTME: This script isolates and tests the specific phase transition issue

console.log('🔍 Phase Transition Verification Script');

// Test the exact sequence that should happen
function verifyPhaseTransition() {
    console.log('\n=== Phase Transition Verification ===');
    
    try {
        // Step 1: Create GameState
        console.log('Step 1: Creating GameState...');
        const testGameState = new GameState();
        console.log('Initial phase:', testGameState.gamePhase);
        
        // Step 2: Initialize game
        console.log('Step 2: Initializing game...');
        testGameState.initializeGame(['Alice', 'Bob', 'Charlie']);
        console.log('After initializeGame phase:', testGameState.gamePhase);
        
        // Step 3: Create deck
        console.log('Step 3: Creating and shuffling deck...');
        testGameState.deck = createDeck();
        testGameState.drawPile = shuffleDeck(testGameState.deck);
        console.log('Deck created, draw pile size:', testGameState.drawPile.length);
        
        // Step 4: Deal cards (this should NOT change phase)
        console.log('Step 4: Dealing cards...');
        const dealSuccess = dealInitialCards(testGameState);
        console.log('Deal success:', dealSuccess);
        console.log('After dealInitialCards phase:', testGameState.gamePhase);
        
        // Step 5: Determine first player and set exchange phase
        console.log('Step 5: Determining first player and setting exchange phase...');
        determineFirstPlayer(testGameState);
        testGameState.gamePhase = GAME_PHASES.EXCHANGE;
        console.log('After manual phase setting:', testGameState.gamePhase);
        
        // Step 6: Test initializeDecks function
        console.log('\nStep 6: Testing initializeDecks function...');
        const freshGameState = new GameState();
        freshGameState.initializeGame(['Test1', 'Test2', 'Test3']);
        freshGameState.deck = createDeck();
        freshGameState.drawPile = shuffleDeck(freshGameState.deck);
        
        console.log('Before initializeDecks:', freshGameState.gamePhase);
        const initSuccess = initializeDecks(freshGameState);
        console.log('initializeDecks success:', initSuccess);
        console.log('After initializeDecks:', freshGameState.gamePhase);
        
        // Verification
        if (freshGameState.gamePhase === 'exchange') {
            console.log('✅ Phase transition works correctly!');
            return true;
        } else {
            console.log('❌ Phase transition failed!');
            console.log('Expected: "exchange", Got:', freshGameState.gamePhase);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Verification failed with error:', error);
        return false;
    }
}

// Test GAME_PHASES constants
function verifyConstants() {
    console.log('\n=== Constants Verification ===');
    console.log('GAME_PHASES.SETUP:', GAME_PHASES.SETUP);
    console.log('GAME_PHASES.EXCHANGE:', GAME_PHASES.EXCHANGE);
    console.log('GAME_PHASES.PLAYING:', GAME_PHASES.PLAYING);
    console.log('GAME_PHASES.GAME_OVER:', GAME_PHASES.GAME_OVER);
    
    if (GAME_PHASES.EXCHANGE === 'exchange') {
        console.log('✅ Constants are correct');
        return true;
    } else {
        console.log('❌ Constants are incorrect');
        return false;
    }
}

// Run verification
function runVerification() {
    console.log('🚀 Starting Phase Transition Verification...\n');
    
    const constantsOk = verifyConstants();
    const transitionOk = verifyPhaseTransition();
    
    console.log('\n📊 Verification Results:');
    console.log('========================');
    console.log(`Constants: ${constantsOk ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Phase Transition: ${transitionOk ? '✅ PASS' : '❌ FAIL'}`);
    
    if (constantsOk && transitionOk) {
        console.log('\n🎉 All verifications PASSED! Phase transition is working correctly.');
    } else {
        console.log('\n⚠️ Some verifications FAILED. Check the logs above.');
    }
    
    return constantsOk && transitionOk;
}

// Export for console use
window.verifyPhase = {
    run: runVerification,
    testTransition: verifyPhaseTransition,
    testConstants: verifyConstants
};

console.log('🎮 Verification functions available as window.verifyPhase');
console.log('Usage: verifyPhase.run()'); 