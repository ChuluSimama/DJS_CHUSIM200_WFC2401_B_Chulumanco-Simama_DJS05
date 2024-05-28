## REDUX-INSPIRED STORE
 a Redux-inspired store to manage the state of a simple Tally App.

### File Structure
- index.html
- index.js
- styles.css
- README.md

### Changes Made
- State Management Integration: Introduced a Redux-like state management system to manage the order count.
- Action Types: Defined action types (ADD, SUBTRACT, RESET) for managing the order count.
- Reducer: Created a reducer function (counterReducer) to handle state changes based on dispatched actions.
- Store Creation: Implemented a function (createStore) to create a store that manages the state and allows subscribing to state changes.
- Counter Increment: Modified the addToOrder function to dispatch an ADD action whenever an item is added to the order.
- Order Reset: Added a resetOrder function to reset the order and dispatch a RESET action.
- Testing Scenarios: Added scenarios to test the state management system (initial state, incrementing, decrementing, and resetting the counter).