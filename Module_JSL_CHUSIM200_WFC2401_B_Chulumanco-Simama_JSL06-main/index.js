// Define initial state
const initialState = {
    count: 0
};

// Define action types
const actionTypes = {
    ADD: 'ADD',
    SUBTRACT: 'SUBTRACT',
    RESET: 'RESET'
};

// Define the reducer
function counterReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return { count: state.count + 1 };
        case actionTypes.SUBTRACT:
            return { count: state.count - 1 };
        case actionTypes.RESET:
            return { count: 0 };
        default:
            return state;
    }
}

// Create the store
function createStore(reducer) {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    // Initialize the state
    dispatch({ type: '@@INIT' });

    return { getState, dispatch, subscribe };
}

// Create store instance
const store = createStore(counterReducer);

// Subscribe to state changes to log the state
store.subscribe(() => console.log(store.getState()));

// Menu and prices
const menu = {
    Starters: ["Garlic Bread", "Bruschetta"],
    MainCourses: ["Margherita Pizza", "Spaghetti Carbonara"],
    Desserts: ["Tiramisu", "Cheesecake"]
};

const prices = {
    Starters: 5,
    MainCourses: 10,
    Desserts: 7
};

// Display menu items
function displayMenuItems(menu) {
    const menuContainer = document.getElementById('menu');

    for (const [category, items] of Object.entries(menu)) {
        const categoryElement = document.createElement('h3');
        categoryElement.textContent = category;
        menuContainer.appendChild(categoryElement);

        const itemList = document.createElement('ul');
        menuContainer.appendChild(itemList);

        items.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = item;
            itemElement.addEventListener('click', () => addToOrder(item, category));
            itemList.appendChild(itemElement);
        });
    }
}

// Add to order
function addToOrder(itemName, category) {
    const orderItemsList = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');

    const orderItem = document.createElement('li');
    orderItem.textContent = itemName;
    orderItemsList.appendChild(orderItem);

    const currentTotal = parseFloat(orderTotalElement.textContent);
    const itemPrice = prices[category];
    const newTotal = currentTotal + itemPrice;
    orderTotalElement.textContent = newTotal.toFixed(2);

    // Increment the counter whenever an item is added
    store.dispatch({ type: actionTypes.ADD });
}

// Reset order
function resetOrder() {
    document.getElementById('order-items').innerHTML = '';
    document.getElementById('order-total').textContent = '0.00';

    // Reset the counter
    store.dispatch({ type: actionTypes.RESET });
}

window.resetOrder = resetOrder;

// Initialize menu system
function initMenuSystem(menu) {
    displayMenuItems(menu);
}

initMenuSystem(menu);

// Scenario 1: Initial State Verification
console.log("Scenario 1: Initial State Verification");
console.log(store.getState()); // { count: 0 }

// Scenario 2: Incrementing the Counter
console.log("Scenario 2: Incrementing the Counter");
store.dispatch({ type: actionTypes.ADD });
store.dispatch({ type: actionTypes.ADD });

// Scenario 3: Decrementing the Counter
console.log("Scenario 3: Decrementing the Counter");
store.dispatch({ type: actionTypes.SUBTRACT });

// Scenario 4: Resetting the Counter
console.log("Scenario 4: Resetting the Counter");
store.dispatch({ type: actionTypes.RESET });
