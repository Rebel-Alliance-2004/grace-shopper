import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

import {
  loadingTypes, cartTypes, types, userTypes
} from './actions';
import reviewReducer from './reviewReducer'

const initialUserState = {
  username: null,
  loggedIn: false,
  role: 'guest',
  message: ''
};

const loginReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case userTypes.LOGIN:
      return {
        ...state,
        username: action.username,
        loggedIn: true,
        role: action.role,
      };
    case userTypes.LOGOUT:
      return {
        ...state,
        username: null,
        loggedIn: false,
        role: 'guest'
      };
    case userTypes.LOGIN_FAIL: {
      return {
        username: null,
        loggedIn: false,
        message: action.message,
      };
    }
    case userTypes.CREATE_ACCOUNT: {
      return {
        username: action.username,
        loggedIn: true,
        role: 'customer',
        message: ''
      }
    }
    default:
      return state;
  }
};

const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case loadingTypes.LOADING:
      return true;
    case loadingTypes.LOADED:
      return false;
    default:
      return state;
  }
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return action.products
    case types.ADD_PRODUCT:
      return [...state, action.payload];
    case types.DELETE_PRODUCT:
      return action.payload;
    case types.UPDATE_PRODUCT:
      return action.payload
    default:
      return state;
  }
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case types.ADD_CATEGORY:
      return [...state, action.payload];
    case types.GET_CATEGORIES:
      return action.payload;
    case types.DELETE_CATEGORY:
      return action.payload.categories;
    case types.UPDATE_CATEGORY:
      return action.payload
    default:
      return state;
  }
};

const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return action.cart;
    case cartTypes.GET_CART:
      return action.cart;
    case cartTypes.UPDATE_CART:
      return action.cart;
    case userTypes.LOGOUT:
      return {};
    case cartTypes.GET_CARTS:
      return {
        carts: action.carts
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  user: loginReducer,
  loading: loadingReducer,
  products: productsReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  reviews: reviewReducer
});

const store = createStore(reducer, applyMiddleware(
  thunks,
));

export default store;
