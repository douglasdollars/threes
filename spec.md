# Threes Card Game Web App Specification

## Overview
A simple web application implementation of the card game "Threes" (also known as Shithead) for 2-4 players in local multiplayer mode. The game uses a hide-and-reveal turn system on a single device.

## Game Rules
The game implements the standard Shithead rules as described:

### Setup
- Uses one standard 52-card deck
- Card ranking: 2 (high), A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3, 2 (low)
- Each player receives:
  - 3 face-down table cards
  - 3 face-up table cards (placed on top of face-down cards)
  - 3 hand cards
- Before play, players may exchange any cards between hand and face-up table cards
- First player is determined by who has the lowest face-up card (3s first, then 4s, etc.)

### Gameplay
- Players take turns playing cards equal to or higher than the discard pile
- Must play from hand first, then face-up cards, then face-down cards
- Draw cards to maintain 3-card hand until draw pile is empty
- Special cards:
  - 2s: Can be played on anything, anything can be played on 2s
  - 10s: Can be played anytime, clears the pile, same player goes again
  - Four of a kind: Clears the pile, same player goes again
- Players who can't/won't play must pick up the entire discard pile
- Goal: Be first to get rid of all cards and avoid being the last player (loser)

## User Interface Design

### Initial Setup Screen
- Title: "Threes"
- Player count selection (2-4 players)
- Name entry fields for each player with default names ("Player 1", "Player 2", etc.)
- "Start Game" button

### Game Layout
- **Center**: Discard pile (showing top cards) and draw pile
- **Bottom**: Current player's hand cards
- **Around edges**: Other players' table cards (face-up and face-down) arranged like sitting around a table
- **Top**: Current player name display
- **UI Controls**: 
  - "Play Selected Cards" button
  - "Pick Up Pile" button
  - "Pass to Next Player" button (for turn transitions)

### Card Representation
- Simplified design showing rank and suit symbols only
- Face-down cards show generic card back
- Standard card proportions sized appropriately for desktop screens

## User Interactions

### Turn System
- Hide-and-reveal system: Only current player's hand visible during their turn
- "Pass to Next Player" button transitions between players
- Player name displayed prominently during their turn

### Card Selection and Play
- Click cards to select/deselect them
- Auto-highlight other cards of same rank when one is selected
- "Play Selected Cards" button to confirm plays
- Validation prevents invalid multi-card selections (different ranks)

### Pick Up Pile
- Dedicated "Pick Up Pile" button
- Alternative: Click directly on discard pile
- Both methods available for user preference

### Pre-Game Card Exchange
- Same hide-and-reveal system for each player
- Click hand card, then click face-up table card to swap positions
- Visual feedback during selection
- "Confirm Exchanges" button to proceed to next player

### Error Handling
- Brief error messages for invalid plays
- Actions prevented rather than allowed and corrected
- Clear feedback on why moves are invalid

## Special Game Mechanics

### Special Card Effects
- Simple visual feedback for special actions
- Brief messages for pile clearing (10s, four-of-a-kind)
- Automatic handling of special card rules
- Smooth transition when same player gets another turn

### End Game
- Players drop out when all cards are played
- Finished players' table positions remain visible but grayed out
- Simple "Game Over" message when only one player remains
- No scoring system or ranking tracking

## Technical Requirements

### Platform
- Modern desktop web browsers
- Local multiplayer (no networking required)
- No mobile responsiveness needed
- Offline functionality once loaded

### Browser Compatibility
- Modern browsers with ES6+ support
- No legacy browser support required

### Performance
- Smooth animations and transitions
- Responsive UI for desktop mouse interactions
- Efficient card rendering and game state management

## Implementation Notes

### Game State Management
- Track all player hands, table cards, discard pile, and draw pile
- Validate all moves according to game rules
- Handle special card effects automatically
- Manage turn order and player status

### User Experience
- Intuitive card selection and play mechanics
- Clear visual feedback for all actions
- Consistent hide-and-reveal pattern throughout
- Minimal learning curve for players familiar with the card game

### Visual Design
- Clean, simple interface focusing on gameplay
- Clear distinction between different card states (hand, face-up, face-down)
- Appropriate spacing and sizing for desktop use
- Professional appearance without complex graphics
