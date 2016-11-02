import { inspect } from 'util';

export default function createLogger() {
  return store => next => action => { // eslint-disable-line no-unused-vars
    const formattedPayload = inspect(action.payload, {
      colors: true,
    });

    console.log(` * ${action.type}: ${formattedPayload}`); // eslint-disable-line no-console

    return next(action);
  };
}
