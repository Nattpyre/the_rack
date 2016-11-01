/* eslint-disable import/prefer-default-export */

import constants from '../constants';

export function setRuntimeVariable({ name, value }) {
  return {
    type: constants.types.SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}
