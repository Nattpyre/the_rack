import { combineReducers } from 'redux';
import runtime from './runtime';
import cart from './cart';

export default combineReducers({
  runtime,
  cart,
});
