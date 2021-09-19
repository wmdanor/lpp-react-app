import { createStore } from 'redux';
import { Map, List } from 'immutable';
import rootReducers from './RootReducer';

function createImmutableState(object) {
  const newObject = {};
  const keys = Object.keys(object);
  for (let i = 0; i < keys.length; i += 1) {
    const value = object[keys[i]];
    if (value instanceof Array) {
      newObject[keys[i]] = List(value);
    } else {
      newObject[keys[i]] = Map(value);
    }
  }

  return newObject;
}

// convert object to string and store in localStorage
function saveToLocalStorage(state) {
  try {
    const stateToStore = {
      cart: state.cart,
      favorites: state.favorites,
    };
    const serialisedState = JSON.stringify(stateToStore);
    localStorage.setItem('persistantState', serialisedState);
    // localStorage.setItem('persistantState', undefined);
  } catch (e) {
    console.warn(e);
  }
}

// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('persistantState');
    console.log(serialisedState);
    if (serialisedState === null) return undefined;
    const parsed = JSON.parse(serialisedState);
    return createImmutableState(parsed);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

// create our store from our rootReducers and use loadFromLocalStorage
// to overwrite any values that we already have saved
const store = createStore(rootReducers, loadFromLocalStorage());

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
