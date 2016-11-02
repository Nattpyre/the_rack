import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createHelpers from './createHelpers';
import createLogger from './logger';

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  if (__DEV__) {
    middleware.push(createLogger());

    let devToolsExtension = f => f;

    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(
      applyMiddleware(...middleware),
      devToolsExtension,
      autoRehydrate(),
    );
  } else {
    enhancer = compose(
      applyMiddleware(...middleware),
      autoRehydrate(),
    );
  }

  const store = createStore(rootReducer, initialState, enhancer);

  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
    );
  }

  return store;
}
