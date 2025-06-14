# Threes Card Game Development Blueprint

## High-Level Architecture Plan

### Phase 1: Foundation (Steps 1-3)

- Project structure and basic HTML/CSS setup
- Core data structures and game state management
- Basic card representation and styling

### Phase 2: Setup and Layout (Steps 4-6)

- Setup screen implementation
- Game board layout and positioning
- Initial card dealing system

### Phase 3: Core Gameplay (Steps 7-11)

- Card exchange phase
- Basic turn mechanics and card selection
- Play validation and pile management
- Turn transitions and UI state management

### Phase 4: Advanced Features (Steps 12-14)

- Special card effects (2s, 10s, four-of-a-kind)
- End game detection and handling
- Error handling and user feedback

### Phase 5: Polish (Step 15)

- Final integration and testing
- Visual improvements and animations

## Detailed Step Breakdown

### Step 1: Project Foundation

Create basic project structure with HTML, CSS, and JavaScript files, plus core card data structures.

### Step 2: Card System and Styling

Implement card representation, basic styling, and deck management functions.

### Step 3: Game State Management

Create the main game state class and player management system.

### Step 4: Setup Screen

Build the initial setup screen with player count selection and name input.

### Step 5: Game Board Layout

Create the main game layout with center area and player positions around the table.

### Step 6: Card Dealing System

Implement the initial card dealing logic and game initialization.

### Step 7: Card Exchange Phase

Build the pre-game card exchange system with hide-and-reveal UI.

### Step 8: Basic Card Selection

Implement card selection mechanics and visual feedback.

### Step 9: Play Validation and Basic Turns

Add card play validation and basic turn execution.

### Step 10: Pile Management

Implement pick-up pile functionality and discard pile management.

### Step 11: Turn Transitions

Create the hide-and-reveal turn transition system.

### Step 12: Special Card Effects

Add special card handling for 2s, 10s, and four-of-a-kind.

### Step 13: End Game Logic

Implement player elimination and game over detection.

### Step 14: Error Handling

Add comprehensive error handling and user feedback.

### Step 15: Final Polish

Final integration, testing, and visual improvements.

---

# LLM Implementation Prompts

## Step 1: Project Foundation

```
Create the basic project structure for a Threes card game web app. Set up:

1. An HTML file (index.html) with:
   - Proper HTML5 structure
   - Title "Threes Card Game"
   - Links to CSS and JavaScript files
   - A main container div with id="app"

2. A CSS file (styles.css) with:
   - CSS reset/normalize
   - Basic body styling (font-family, margin, padding)
   - Container styling for the main app area
   - CSS custom properties for colors and common values

3. A JavaScript file (game.js) with:
   - Basic card data structure (Card class or object)
   - Card ranks array: ['2', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']
   - Card suits array: ['♠', '♥', '♦', '♣']
   - Basic card creation function

Make sure all files are properly linked and the basic structure is working. Keep it simple and focused on the foundation.
```

## Step 2: Card System and Styling

```
Building on the previous step, enhance the card system and add visual styling:

1. Expand the Card class/object to include:
   - rank, suit, and id properties
   - getValue() method for card comparison (2=14, A=13, K=12, etc.)
   - toString() method for display

2. Add CSS styling for cards:
   - .card class with proper dimensions (standard card ratio)
   - Face-up card styling with rank and suit display
   - Face-down card styling with generic back
   - Hover effects and selection states
   - Red/black color coding for suits

3. Create utility functions:
   - createDeck() - generates full 52-card deck
   - shuffleDeck() - Fisher-Yates shuffle implementation
   - renderCard() - creates DOM element for a card

4. Add a simple test in the HTML to display a few sample cards to verify the styling works.

Focus on clean, readable card representation that will work well in the game layout.
```

## Step 3: Game State Management

```
Building on the card system, create the core game state management:

1. Create a Player class/object with properties:
   - name, handCards, faceUpCards, faceDownCards
   - isActive, hasFinished properties
   - methods: addCard(), removeCard(), getCardCount()

2. Create a GameState class with properties:
   - players array, currentPlayerIndex, gamePhase
   - deck, discardPile, drawPile
   - methods: initializeGame(), getCurrentPlayer(), nextPlayer()

3. Add game phase constants:
   - SETUP, EXCHANGE, PLAYING, GAME_OVER

4. Create basic game initialization:
   - setupPlayers() function
   - initializeDecks() function
   - Basic game state logging for debugging

5. Update the HTML to include a simple debug area to display current game state.

Keep the focus on clean data management and state tracking. No UI interactions yet - just the underlying game logic.
```

## Step 4: Setup Screen

```
Create the initial setup screen that allows players to configure the game:

1. Add HTML structure for setup screen:
   - Game title display
   - Player count selector (radio buttons or dropdown for 2-4 players)
   - Dynamic name input fields based on player count
   - "Start Game" button

2. Add CSS styling for the setup screen:
   - Centered layout and attractive styling
   - Form styling for inputs and buttons
   - Show/hide functionality for different numbers of players

3. JavaScript functionality:
   - setupScreen object/module to handle setup logic
   - Event listeners for player count changes
   - Dynamic generation of name input fields
   - Default name generation ("Player 1", "Player 2", etc.)
   - Form validation and game initialization trigger

4. Integration:
   - Connect setup screen to GameState initialization
   - Hide setup screen and show game area when starting
   - Pass player names and count to game initialization

Make sure the setup flow is smooth and intuitive. Test with different player counts.
```

## Step 5: Game Board Layout

```
Create the main game board layout with proper positioning for all game elements:

1. HTML structure for game board:
   - Center area for discard pile and draw pile
   - Player areas positioned around the edges (top, left, right for other players)
   - Current player area at bottom
   - Control buttons area
   - Current player name display

2. CSS for game board layout:
   - Use CSS Grid or Flexbox for main layout
   - Position player areas around the table
   - Style the center area for piles
   - Card positioning within player areas
   - Responsive spacing and sizing

3. JavaScript for layout management:
   - renderGameBoard() function
   - Position calculation for different player counts
   - Player area creation and management
   - Basic empty state rendering

4. UI elements:
   - Add placeholder areas for all game elements
   - Style the control buttons (Play Selected, Pick Up Pile, Pass Turn)
   - Current player name display area

Focus on creating a layout that feels like sitting around a table. Test with 2, 3, and 4 player configurations.
```

## Step 6: Card Dealing System

```
Implement the card dealing logic and initial game setup:

1. Dealing logic in GameState:
   - dealInitialCards() method that follows game rules
   - Deal 3 face-down cards to each player
   - Deal 3 face-up cards on top of face-down cards
   - Deal 3 hand cards to each player
   - Set up draw pile with remaining cards

2. Card rendering system:
   - renderPlayerArea() function for each player's cards
   - renderCenterArea() function for draw/discard piles
   - Different rendering for face-up, face-down, and hand cards
   - Hide other players' hand cards initially

3. Game initialization flow:
   - Connect setup screen completion to dealing
   - Update game board display after dealing
   - Set game phase to EXCHANGE
   - Determine first player based on face-up cards

4. Visual representation:
   - Display all face-up and face-down cards for all players
   - Show current player's hand cards
   - Display draw pile (with count)
   - Empty discard pile initially

Test the dealing system with different player counts. Verify card distribution matches game rules.
```

## Step 7: Card Exchange Phase

```
Implement the pre-game card exchange phase where players can swap hand and face-up cards:

1. Exchange UI system:
   - Hide-and-reveal interface for each player's turn
   - Display current player's hand and face-up cards
   - "Pass to Next Player" button
   - Clear instructions for the exchange phase

2. Card swapping mechanics:
   - Click handler for card selection (hand → face-up swap)
   - Visual selection states for cards
   - swapCards() function in Player class
   - Validation to ensure proper card types are swapped

3. Exchange flow control:
   - exchangePhase object to manage the process
   - Track which player is currently exchanging
   - Transition through all players
   - Move to PLAYING phase when complete

4. UI enhancements:
   - Highlight swappable cards
   - Show exchange instructions
   - Confirm button for each player's exchanges
   - Visual feedback during swaps

Make sure the exchange phase is intuitive and follows the hide-and-reveal pattern that will be used throughout the game.
```

## Step 8: Basic Card Selection

```
Implement the card selection system for gameplay:

1. Card selection mechanics:
   - Click handlers for card selection/deselection
   - Visual selection states (highlighted/selected cards)
   - Multiple card selection for same rank
   - Auto-highlighting of matching rank cards

2. Selection validation:
   - validateSelection() function
   - Ensure only same-rank cards can be selected together
   - Clear selection when invalid cards are clicked
   - Update Play Selected Cards button state

3. UI feedback:
   - Selected card styling
   - Suggested card highlighting
   - Enable/disable Play Selected Cards button
   - Selection count display

4. Integration with game state:
   - Track selected cards in current player's state
   - Clear selections on turn transitions
   - Handle selection during different game phases

Focus on making card selection intuitive and visually clear. Test with multiple cards of the same rank.
```

## Step 9: Play Validation and Basic Turns

```
Implement card play validation and basic turn execution:

1. Play validation system:
   - canPlayCards() function to check if cards can be played
   - Compare selected cards with top of discard pile
   - Handle special cases (empty pile, 2s wild cards)
   - Validate card rank consistency

2. Card playing mechanics:
   - playSelectedCards() function
   - Move cards from hand to discard pile
   - Update game state after play
   - Handle draw pile replenishment

3. Basic turn flow:
   - Play Selected Cards button functionality
   - Card validation before play
   - Error messages for invalid plays
   - Automatic hand replenishment from draw pile

4. Game state updates:
   - Update discard pile display
   - Update player hand display
   - Update draw pile count
   - Check for phase transitions (hand → face-up → face-down)

Test with various card combinations and ensure validation works correctly. Add clear error messages for invalid plays.
```

## Step 10: Pile Management

```
Implement the pick-up pile functionality and discard pile management:

1. Pick-up pile mechanics:
   - pickUpPile() function
   - Move all discard pile cards to current player's hand
   - Clear discard pile
   - Update UI to reflect changes

2. Pile interaction:
   - "Pick Up Pile" button functionality
   - Click on discard pile to pick up (alternative method)
   - Confirmation or immediate action
   - Handle large pile pickup

3. Discard pile display:
   - Show top cards of discard pile
   - Display pile size indicator
   - Visual representation of pile state
   - Empty pile state handling

4. Turn progression:
   - Automatic turn advance after pickup
   - Next player starts new discard pile
   - Reset selection states
   - Update current player display

Ensure pile management is smooth and intuitive. Test with large discard piles.
```

## Step 11: Turn Transitions

```
Implement the hide-and-reveal turn transition system:

1. Turn transition mechanics:
   - hideCurrentPlayer() function
   - showNextPlayer() function
   - "Pass to Next Player" button
   - Smooth UI transitions

2. Player visibility management:
   - Hide current player's hand cards
   - Show transition screen with next player name
   - Reveal next player's cards on confirmation
   - Maintain table card visibility for all players

3. Turn flow control:
   - nextTurn() function in GameState
   - Handle different player states (active, finished)
   - Skip finished players
   - Update current player indicator

4. UI state management:
   - Clear card selections on turn change
   - Reset button states
   - Update player name display
   - Handle control button visibility

Focus on creating smooth transitions that maintain game privacy between players. Test the full turn cycle.
```

## Step 12: Special Card Effects

```
Implement special card effects for 2s, 10s, and four-of-a-kind:

1. Special card detection:
   - checkForSpecialEffects() function
   - Detect when 2s are played (wild cards)
   - Detect when 10s are played (pile clear)
   - Detect four-of-a-kind completion

2. Special effect handlers:
   - handle2sEffect() - allow any card to be played next
   - handle10Effect() - clear pile, same player continues
   - handleFourOfAKindEffect() - clear pile, same player continues

3. Pile clearing mechanics:
   - clearDiscardPile() function
   - Remove pile from play (not to hand)
   - Give same player another turn
   - Visual feedback for pile clearing

4. UI feedback for special effects:
   - Brief messages for special actions ("Pile cleared!")
   - Visual indicators for wild cards (2s)
   - Smooth transitions for continued turns

Keep special effects simple but clear. Test each special case thoroughly.
```

## Step 13: End Game Logic

```
Implement player elimination and game over detection:

1. Player elimination system:
   - checkPlayerFinished() function
   - Remove players when all cards are gone
   - Handle face-down card flipping rules
   - Update player status display

2. Game over detection:
   - checkGameOver() function
   - Detect when only one player remains
   - Identify the losing player ("shithead")
   - Trigger game over state

3. End game UI:
   - Gray out finished players' areas
   - Maintain table visibility for finished players
   - Game over message display
   - Simple end game screen

4. Final card play validation:
   - Handle face-down card reveals
   - Validate blind plays from face-down cards
   - Force pickup when face-down card doesn't play

Test end game scenarios with different player counts. Ensure proper player elimination sequence.
```

## Step 14: Error Handling

```
Add comprehensive error handling and user feedback:

1. Error message system:
   - showError() function for displaying messages
   - Different error types (invalid play, selection error, etc.)
   - Timed message dismissal
   - Non-intrusive error display

2. Input validation:
   - Validate all user interactions
   - Prevent invalid card selections
   - Handle edge cases gracefully
   - Provide helpful feedback messages

3. Game state validation:
   - Validate game state consistency
   - Handle unexpected states
   - Recovery mechanisms for errors
   - Debug logging for development

4. User experience improvements:
   - Clear feedback for all actions
   - Disable invalid actions
   - Helpful hints and tips
   - Smooth error recovery

Focus on creating a robust, user-friendly experience. Test edge cases and error conditions.
```

## Step 15: Final Polish

```
Complete the game with final integration, testing, and visual improvements:

1. Final integration:
   - Connect all game systems together
   - Test complete game flow from setup to finish
   - Ensure all features work together smoothly
   - Fix any remaining bugs or issues

2. Visual improvements:
   - Add subtle animations for card movements
   - Improve visual feedback for actions
   - Polish the overall appearance
   - Ensure consistent styling throughout

3. Performance optimization:
   - Optimize rendering functions
   - Minimize DOM manipulations
   - Clean up event listeners
   - Ensure smooth performance

4. Final testing:
   - Test all game scenarios
   - Verify rules implementation
   - Test with different player counts
   - Ensure browser compatibility

5. Documentation:
   - Add code comments
   - Create simple user instructions
   - Document any setup requirements

Create a polished, complete game that's ready for players to enjoy. Test thoroughly with actual gameplay.
```
