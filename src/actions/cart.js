/* eslint-disable import/prefer-default-export */

import constants from '../constants';

export function addToCart(product) {
  return {
    type: constants.types.ADD_TO_CART,
    payload: {
      product,
    },
  };
}

export function removeFromCart(product) {
  return {
    type: constants.types.REMOVE_FROM_CART,
    payload: {
      product,
    },
  };
}
