import _ from 'lodash';
import constants from '../constants';

const initialState = {
  products: [],
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case constants.types.ADD_TO_CART:
      return {
        ...state,
        products: [
          ...state.products,
          action.payload.product,
        ],
      };
    case constants.types.REMOVE_FROM_CART:
      return {
        ...state,
        products: _.filter(state.products, product => !_.isEqual(product, action.payload.product)),
      };
    default:
      return state;
  }
}
