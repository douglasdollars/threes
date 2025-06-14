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

- [ ] Create Player class with `name` property
- [ ] Add `handCards`, `faceUpCards`, `faceDownCards` arrays
- [ ] Add `isActive`, `hasFinished` boolean properties
- [ ] Implement `addCard()` method
- [ ] Implement `removeCard()` method
- [ ] Implement `getCardCount()` method

### GameState Class

- [ ] Create GameState class with `players` array
- [ ] Add `currentPlayerIndex` property
- [ ] Add `gamePhase` property
- [ ] Add `deck`, `discardPile`, `drawPile` properties
- [ ] Implement `initializeGame()` method
- [ ] Implement `getCurrentPlayer()` method
- [ ] Implement `nextPlayer()` method

### Game Phases

- [ ] Define game phase constants: `SETUP`, `EXCHANGE`, `PLAYING`, `GAME_OVER`
- [ ] Implement phase transition logic

### Initialization Functions

- [ ] Create `setupPlayers()` function
- [ ] Create `initializeDecks()` function
- [ ] Add basic game state logging for debugging

### Testing

- [ ] Update HTML to include debug area for game state display
- [ ] Test game state initialization
- [ ] Verify player management works correctly

## ✅ Step 4: Setup Screen

### HTML Structure

- [ ] Add game title display element
- [ ] Create player count selector (radio buttons or dropdown for 2-4 players)
- [ ] Create container for dynamic name input fields
- [ ] Add "Start Game" button
- [ ] Structure setup screen container

### CSS Styling

- [ ] Style setup screen with centered layout
- [ ] Style form inputs and buttons
- [ ] Create attractive title styling
- [ ] Add show/hide functionality CSS
- [ ] Style player count selector
- [ ] Make setup screen visually appealing

### JavaScript Functionality

- [ ] Create `setupScreen` object/module
- [ ] Add event listeners for player count changes
- [ ] Implement dynamic name input field generation
- [ ] Create default name generation ("Player 1", "Player 2", etc.)
- [ ] Add form validation
- [ ] Implement game initialization trigger

### Integration

- [ ] Connect setup screen to GameState initialization
- [ ] Implement hide setup/show game area functionality
- [ ] Pass player names and count to game initialization
- [ ] Test setup flow with different player counts

## ✅ Step 5: Game Board Layout

### HTML Structure

- [ ] Create center area for discard pile and draw pile
- [ ] Create player areas positioned around edges
- [ ] Create current player area at bottom
- [ ] Add control buttons area
- [ ] Add current player name display element

### CSS Layout

- [ ] Implement main layout using CSS Grid or Flexbox
- [ ] Position player areas around the table (top, left, right)
- [ ] Style center area for card piles
- [ ] Create card positioning within player areas
- [ ] Add responsive spacing and sizing
- [ ] Style for different player counts (2, 3, 4)

### JavaScript Layout Management

- [ ] Create `renderGameBoard()` function
- [ ] Implement position calculation for different player counts
- [ ] Create player area generation and management
- [ ] Implement basic empty state rendering

### UI Elements

- [ ] Add placeholder areas for all game elements
- [ ] Style control buttons (Play Selected, Pick Up Pile, Pass Turn)
- [ ] Create current player name display area
- [ ] Test layout with different player configurations

## ✅ Step 6: Card Dealing System

### Dealing Logic

- [ ] Implement `dealInitialCards()` method in GameState
- [ ] Deal 3 face-down cards to each player
- [ ] Deal 3 face-up cards on top of face-down cards
- [ ] Deal 3 hand cards to each player
- [ ] Set up draw pile with remaining cards
- [ ] Test dealing with different player counts

### Card Rendering System

- [ ] Create `renderPlayerArea()` function for each player's cards
- [ ] Create `renderCenterArea()` function for draw/discard piles
- [ ] Implement different rendering for face-up, face-down, and hand cards
- [ ] Hide other players' hand cards initially

### Game Initialization Flow

- [ ] Connect setup screen completion to dealing
- [ ] Update game board display after dealing
- [ ] Set game phase to EXCHANGE
- [ ] Implement first player determination based on face-up cards

### Visual Representation

- [ ] Display all face-up cards for all players
- [ ] Display face-down cards (card backs) for all players
- [ ] Show current player's hand cards
- [ ] Display draw pile with count
- [ ] Show empty discard pile initially
- [ ] Test card distribution matches game rules

## ✅ Step 7: Card Exchange Phase

### Exchange UI System

- [ ] Implement hide-and-reveal interface for each player
- [ ] Display current player's hand and face-up cards during exchange
- [ ] Add "Pass to Next Player" button for exchange phase
- [ ] Create clear instructions for exchange phase
- [ ] Style exchange phase interface

### Card Swapping Mechanics

- [ ] Add click handlers for card selection (hand ↔ face-up swap)
- [ ] Create visual selection states for cards during exchange
- [ ] Implement `swapCards()` function in Player class
- [ ] Add validation to ensure proper card types are swapped

### Exchange Flow Control

- [ ] Create `exchangePhase` object to manage the process
- [ ] Track which player is currently exchanging
- [ ] Implement transition through all players
- [ ] Move to PLAYING phase when all exchanges complete

### UI Enhancements

- [ ] Highlight swappable cards
- [ ] Show exchange instructions clearly
- [ ] Add confirm button for each player's exchanges
- [ ] Provide visual feedback during swaps
- [ ] Test exchange phase with multiple players

## ✅ Step 8: Basic Card Selection

### Card Selection Mechanics

- [ ] Add click handlers for card selection/deselection
- [ ] Create visual selection states (highlighted/selected cards)
- [ ] Implement multiple card selection for same rank
- [ ] Add auto-highlighting of matching rank cards

### Selection Validation

- [ ] Create `validateSelection()` function
- [ ] Ensure only same-rank cards can be selected together
- [ ] Clear selection when invalid cards are clicked
- [ ] Update "Play Selected Cards" button state based on selection

### UI Feedback

- [ ] Style selected cards clearly
- [ ] Implement suggested card highlighting
- [ ] Enable/disable "Play Selected Cards" button appropriately
- [ ] Add selection count display

### Integration

- [ ] Track selected cards in current player's state
- [ ] Clear selections on turn transitions
- [ ] Handle selection during different game phases
- [ ] Test multiple card selection of same rank

## ✅ Step 9: Play Validation and Basic Turns

### Play Validation System

- [ ] Create `canPlayCards()` function to check if cards can be played
- [ ] Compare selected cards with top of discard pile
- [ ] Handle special cases (empty pile, 2s wild cards)
- [ ] Validate card rank consistency in selection

### Card Playing Mechanics

- [ ] Implement `playSelectedCards()` function
- [ ] Move cards from hand to discard pile
- [ ] Update game state after successful play
- [ ] Handle draw pile replenishment after play

### Basic Turn Flow

- [ ] Connect "Play Selected Cards" button functionality
- [ ] Add card validation before play
- [ ] Display error messages for invalid plays
- [ ] Implement automatic hand replenishment from draw pile

### Game State Updates

- [ ] Update discard pile display after play
- [ ] Update player hand display
- [ ] Update draw pile count
- [ ] Check for phase transitions (hand → face-up → face-down)
- [ ] Test various card combinations and validation

## ✅ Step 10: Pile Management

### Pick-up Pile Mechanics

- [ ] Implement `pickUpPile()` function
- [ ] Move all discard pile cards to current player's hand
- [ ] Clear discard pile after pickup
- [ ] Update UI to reflect pile pickup changes

### Pile Interaction

- [ ] Connect "Pick Up Pile" button functionality
- [ ] Add click on discard pile to pick up (alternative method)
- [ ] Handle immediate action (no confirmation needed)
- [ ] Manage large pile pickup efficiently

### Discard Pile Display

- [ ] Show top cards of discard pile clearly
- [ ] Display pile size indicator
- [ ] Create visual representation of pile state
- [ ] Handle empty pile state display

### Turn Progression

- [ ] Implement automatic turn advance after pickup
- [ ] Allow next player to start new discard pile
- [ ] Reset selection states after pickup
- [ ] Update current player display
- [ ] Test with large discard piles

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
