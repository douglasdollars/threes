# Threes Card Game - Development TODO

## ✅ Step 1: Project Foundation

### HTML Setup

- [x] Create `index.html` with proper HTML5 structure
- [x] Add title "Threes Card Game"
- [x] Link to `styles.css` and `game.js`
- [x] Create main container div with `id="app"`
- [x] Test that all files are properly linked

### CSS Setup

- [x] Create `styles.css` file
- [x] Add CSS reset/normalize rules
- [x] Set basic body styling (font-family, margin, padding)
- [x] Create container styling for main app area
- [x] Define CSS custom properties for colors and common values

### JavaScript Setup

- [x] Create `game.js` file
- [x] Define basic Card class or object structure
- [x] Create card ranks array: `['2', 'A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2']`
- [x] Create card suits array: `['♠', '♥', '♦', '♣']`
- [x] Implement basic card creation function
- [x] Test basic structure works in browser

## ✅ Step 2: Card System and Styling

### Card Class Enhancement

- [x] Add `rank`, `suit`, and `id` properties to Card class
- [x] Implement `getValue()` method for card comparison (2=14, A=13, K=12, etc.)
- [x] Implement `toString()` method for display
- [x] Test card comparison logic

### Card Styling

- [x] Create `.card` CSS class with proper dimensions (standard card ratio)
- [x] Style face-up cards with rank and suit display
- [x] Style face-down cards with generic back design
- [x] Add hover effects for interactive cards
- [x] Add selection state styling
- [x] Implement red/black color coding for suits

### Utility Functions

- [x] Create `createDeck()` function - generates full 52-card deck
- [x] Create `shuffleDeck()` function - Fisher-Yates shuffle implementation
- [x] Create `renderCard()` function - creates DOM element for a card
- [x] Test deck creation and shuffling

### Testing

- [x] Add simple test in HTML to display sample cards
- [x] Verify card styling works correctly
- [x] Test card rendering function

## ✅ Step 3: Game State Management

### Player Class

- [x] Create Player class with `name` property
- [x] Add `handCards`, `faceUpCards`, `faceDownCards` arrays
- [x] Add `isActive`, `hasFinished` boolean properties
- [x] Implement `addCard()` method
- [x] Implement `removeCard()` method
- [x] Implement `getCardCount()` method

### GameState Class

- [x] Create GameState class with `players` array
- [x] Add `currentPlayerIndex` property
- [x] Add `gamePhase` property
- [x] Add `deck`, `discardPile`, `drawPile` properties
- [x] Implement `initializeGame()` method
- [x] Implement `getCurrentPlayer()` method
- [x] Implement `nextPlayer()` method

### Game Phases

- [x] Define game phase constants: `SETUP`, `EXCHANGE`, `PLAYING`, `GAME_OVER`
- [x] Implement phase transition logic

### Initialization Functions

- [x] Create `setupPlayers()` function
- [x] Create `initializeDecks()` function
- [x] Add basic game state logging for debugging

### Testing

- [x] Update HTML to include debug area for game state display
- [x] Test game state initialization
- [x] Verify player management works correctly

## ✅ Step 4: Setup Screen

### HTML Structure

- [x] Add game title display element
- [x] Create player count selector (radio buttons or dropdown for 2-4 players)
- [x] Create container for dynamic name input fields
- [x] Add "Start Game" button
- [x] Structure setup screen container

### CSS Styling

- [x] Style setup screen with centered layout
- [x] Style form inputs and buttons
- [x] Create attractive title styling
- [x] Add show/hide functionality CSS
- [x] Style player count selector
- [x] Make setup screen visually appealing

### JavaScript Functionality

- [x] Create `setupScreen` object/module
- [x] Add event listeners for player count changes
- [x] Implement dynamic name input field generation
- [x] Create default name generation ("Player 1", "Player 2", etc.)
- [x] Add form validation
- [x] Implement game initialization trigger

### Integration

- [x] Connect setup screen to GameState initialization
- [x] Implement hide setup/show game area functionality
- [x] Pass player names and count to game initialization
- [x] Test setup flow with different player counts

## ✅ Step 5: Game Board Layout

### HTML Structure

- [x] Create center area for discard pile and draw pile
- [x] Create player areas positioned around edges
- [x] Create current player area at bottom
- [x] Add control buttons area
- [x] Add current player name display element

### CSS Layout

- [x] Implement main layout using CSS Grid or Flexbox
- [x] Position player areas around the table (top, left, right)
- [x] Style center area for card piles
- [x] Create card positioning within player areas
- [x] Add responsive spacing and sizing
- [x] Style for different player counts (2, 3, 4)

### JavaScript Layout Management

- [x] Create `renderGameBoard()` function
- [x] Implement position calculation for different player counts
- [x] Create player area generation and management
- [x] Implement basic empty state rendering

### UI Elements

- [x] Add placeholder areas for all game elements
- [x] Style control buttons (Play Selected, Pick Up Pile, Pass Turn)
- [x] Create current player name display area
- [x] Test layout with different player configurations

## ✅ Step 6: Card Dealing System

### Dealing Logic

- [x] Implement `dealInitialCards()` method in GameState
- [x] Deal 3 face-down cards to each player
- [x] Deal 3 face-up cards on top of face-down cards
- [x] Deal 3 hand cards to each player
- [x] Set up draw pile with remaining cards
- [x] Test dealing with different player counts

### Card Rendering System

- [x] Create `renderPlayerArea()` function for each player's cards
- [x] Create `renderCenterArea()` function for draw/discard piles
- [x] Implement different rendering for face-up, face-down, and hand cards
- [x] Hide other players' hand cards initially

### Game Initialization Flow

- [x] Connect setup screen completion to dealing
- [x] Update game board display after dealing
- [x] Set game phase to EXCHANGE
- [x] Implement first player determination based on face-up cards

### Visual Representation

- [x] Display all face-up cards for all players
- [x] Display face-down cards (card backs) for all players
- [x] Show current player's hand cards
- [x] Display draw pile with count
- [x] Show empty discard pile initially
- [x] Test card distribution matches game rules

## ✅ Step 7: Card Exchange Phase

### Exchange UI System

- [x] Implement hide-and-reveal interface for each player
- [x] Display current player's hand and face-up cards during exchange
- [x] Add "Pass to Next Player" button for exchange phase
- [x] Create clear instructions for exchange phase
- [x] Style exchange phase interface

### Card Swapping Mechanics

- [x] Add click handlers for card selection (hand ↔ face-up swap)
- [x] Create visual selection states for cards during exchange
- [x] Implement `swapCards()` function in Player class
- [x] Add validation to ensure proper card types are swapped

### Exchange Flow Control

- [x] Create `exchangePhase` object to manage the process
- [x] Track which player is currently exchanging
- [x] Implement transition through all players
- [x] Move to PLAYING phase when all exchanges complete

### UI Enhancements

- [x] Highlight swappable cards
- [x] Show exchange instructions clearly
- [x] Add confirm button for each player's exchanges
- [x] Provide visual feedback during swaps
- [x] Test exchange phase with multiple players

## ✅ Step 8: Basic Card Selection

### Card Selection Mechanics

- [x] Add click handlers for card selection/deselection
- [x] Create visual selection states (highlighted/selected cards)
- [x] Implement multiple card selection for same rank
- [x] Add auto-highlighting of matching rank cards

### Selection Validation

- [x] Create `validateSelection()` function
- [x] Ensure only same-rank cards can be selected together
- [x] Clear selection when invalid cards are clicked
- [x] Update "Play Selected Cards" button state based on selection

### UI Feedback

- [x] Style selected cards clearly
- [x] Implement suggested card highlighting
- [x] Enable/disable "Play Selected Cards" button appropriately
- [x] Add selection count display

### Integration

- [x] Track selected cards in current player's state
- [x] Clear selections on turn transitions
- [x] Handle selection during different game phases
- [x] Test multiple card selection of same rank

## ✅ Step 9: Play Validation and Basic Turns

### Play Validation System

- [x] Create `canPlayCards()` function to check if cards can be played
- [x] Compare selected cards with top of discard pile
- [x] Handle special cases (empty pile, 2s wild cards)
- [x] Validate card rank consistency in selection

### Card Playing Mechanics

- [x] Implement `playSelectedCards()` function
- [x] Move cards from hand to discard pile
- [x] Update game state after successful play
- [x] Handle draw pile replenishment after play

### Basic Turn Flow

- [x] Connect "Play Selected Cards" button functionality
- [x] Add card validation before play
- [x] Display error messages for invalid plays
- [x] Implement automatic hand replenishment from draw pile

### Game State Updates

- [x] Update discard pile display after play
- [x] Update player hand display
- [x] Update draw pile count
- [x] Check for phase transitions (hand → face-up → face-down)
- [x] Test various card combinations and validation

## ✅ Step 10: Pile Management

### Pick-up Pile Mechanics

- [x] Implement `pickUpPile()` function
- [x] Move all discard pile cards to current player's hand
- [x] Clear discard pile after pickup
- [x] Update UI to reflect pile pickup changes

### Pile Interaction

- [x] Connect "Pick Up Pile" button functionality
- [x] Add click on discard pile to pick up (alternative method)
- [x] Handle immediate action (no confirmation needed)
- [x] Manage large pile pickup efficiently

### Discard Pile Display

- [x] Show top cards of discard pile clearly
- [x] Display pile size indicator
- [x] Create visual representation of pile state
- [x] Handle empty pile state display

### Turn Progression

- [x] Implement automatic turn advance after pickup
- [x] Allow next player to start new discard pile
- [x] Reset selection states after pickup
- [x] Update current player display
- [x] Test with large discard piles

## ✅ Step 11: Turn Transitions

### Turn Transition Mechanics

- [ ] Create `hideCurrentPlayer()` function
- [ ] Create `showNextPlayer()` function
- [ ] Connect "Pass to Next Player" button
- [ ] Implement smooth UI transitions

### Player Visibility Management

- [ ] Hide current player's hand cards on transition
- [ ] Show transition screen with next player name
- [ ] Reveal next player's cards on confirmation
- [ ] Maintain table card visibility for all players throughout

### Turn Flow Control

- [ ] Implement `nextTurn()` function in GameState
- [ ] Handle different player states (active, finished)
- [ ] Skip finished players in turn order
- [ ] Update current player indicator

### UI State Management

- [ ] Clear card selections on turn change
- [ ] Reset button states for new player
- [ ] Update player name display
- [ ] Handle control button visibility
- [ ] Test full turn cycle with multiple players

## ✅ Step 12: Special Card Effects

### Special Card Detection

- [ ] Create `checkForSpecialEffects()` function
- [ ] Detect when 2s are played (wild cards)
- [ ] Detect when 10s are played (pile clear)
- [ ] Detect four-of-a-kind completion on discard pile

### Special Effect Handlers

- [ ] Implement `handle2sEffect()` - allow any card to be played next
- [ ] Implement `handle10Effect()` - clear pile, same player continues
- [ ] Implement `handleFourOfAKindEffect()` - clear pile, same player continues

### Pile Clearing Mechanics

- [ ] Create `clearDiscardPile()` function
- [ ] Remove pile from play (not to hand)
- [ ] Give same player another turn after pile clear
- [ ] Handle multiple consecutive special effects

### UI Feedback

- [ ] Add brief messages for special actions ("Pile cleared!")
- [ ] Create visual indicators for wild cards (2s)
- [ ] Implement smooth transitions for continued turns
- [ ] Test each special case thoroughly

## ✅ Step 13: End Game Logic

### Player Elimination System

- [ ] Create `checkPlayerFinished()` function
- [ ] Remove players when all cards are gone
- [ ] Handle face-down card flipping rules
- [ ] Update player status display for finished players

### Game Over Detection

- [ ] Implement `checkGameOver()` function
- [ ] Detect when only one player remains
- [ ] Identify the losing player ("shithead")
- [ ] Trigger game over state

### End Game UI

- [ ] Gray out finished players' areas
- [ ] Maintain table visibility for finished players
- [ ] Create game over message display
- [ ] Design simple end game screen

### Final Card Play Validation

- [ ] Handle face-down card reveals properly
- [ ] Validate blind plays from face-down cards
- [ ] Force pickup when face-down card doesn't play
- [ ] Test end game scenarios with different player counts

## ✅ Step 14: Error Handling

### Error Message System

- [ ] Create `showError()` function for displaying messages
- [ ] Define different error types (invalid play, selection error, etc.)
- [ ] Implement timed message dismissal
- [ ] Design non-intrusive error display

### Input Validation

- [ ] Validate all user interactions
- [ ] Prevent invalid card selections
- [ ] Handle edge cases gracefully
- [ ] Provide helpful feedback messages

### Game State Validation

- [ ] Validate game state consistency
- [ ] Handle unexpected states
- [ ] Create recovery mechanisms for errors
- [ ] Add debug logging for development

### User Experience Improvements

- [ ] Ensure clear feedback for all actions
- [ ] Disable invalid actions proactively
- [ ] Add helpful hints and tips
- [ ] Implement smooth error recovery
- [ ] Test edge cases and error conditions

## ✅ Step 15: Final Polish

### Final Integration

- [ ] Connect all game systems together
- [ ] Test complete game flow from setup to finish
- [ ] Ensure all features work together smoothly
- [ ] Fix any remaining bugs or integration issues

### Visual Improvements

- [ ] Add subtle animations for card movements
- [ ] Improve visual feedback for all actions
- [ ] Polish overall appearance and consistency
- [ ] Ensure consistent styling throughout

### Performance Optimization

- [ ] Optimize rendering functions
- [ ] Minimize DOM manipulations
- [ ] Clean up event listeners properly
- [ ] Ensure smooth performance on target browsers

### Final Testing

- [ ] Test all game scenarios thoroughly
- [ ] Verify rules implementation is correct
- [ ] Test with 2, 3, and 4 player configurations
- [ ] Ensure browser compatibility (modern desktop browsers)

### Documentation

- [ ] Add meaningful code comments
- [ ] Create simple user instructions
- [ ] Document any setup requirements
- [ ] Create final project documentation

## ✅ Project Completion Checklist

### Core Functionality

- [ ] Game setup screen works correctly
- [ ] Card dealing follows game rules
- [ ] Card exchange phase works
- [ ] Basic card play and validation works
- [ ] Turn transitions work smoothly
- [ ] Pick up pile functionality works
- [ ] Special card effects work (2s, 10s, four-of-a-kind)
- [ ] End game detection and player elimination works
- [ ] Error handling provides good user experience

### User Experience

- [ ] Interface is intuitive and easy to use
- [ ] Visual feedback is clear and helpful
- [ ] Hide-and-reveal system works smoothly
- [ ] Card selection is responsive and clear
- [ ] Error messages are helpful and non-intrusive

### Technical Quality

- [ ] Code is well-organized and commented
- [ ] Performance is smooth on target browsers
- [ ] No console errors or warnings
- [ ] All features integrate properly
- [ ] Game state management is robust

### Final Verification

- [ ] Complete game can be played from start to finish
- [ ] All player counts (2-4) work correctly
- [ ] All game rules are properly implemented
- [ ] Game is ready for players to enjoy
- [ ] Generate a stylish and comprehensive README.md file
