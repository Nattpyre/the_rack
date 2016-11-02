import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import queryString from 'query-string';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { createPath } from 'history/PathUtils';
import App from './components/App';
import configureStore from './store/configureStore';

// React tap event plugin init
injectTapEventPlugin();

const history = createBrowserHistory();

const context = {
  history,
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());

    return () => {
      removeCss.forEach(f => f());
    };
  },
  store: configureStore(window.APP_STATE, { history }),
};

function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);

  if (node && node.getAttribute(attrName) === attrValue) return;

  if (node) {
    node.parentNode.removeChild(node);
  }

  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);

    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}

function updateMeta(name, content) {
  updateTag('meta', 'name', name, 'content', content);
}

function updateCustomMeta(property, content) { // eslint-disable-line no-unused-vars
  updateTag('meta', 'property', property, 'content', content);
}

function updateLink(rel, href) { // eslint-disable-line no-unused-vars
  updateTag('link', 'rel', rel, 'href', href);
}

const scrollPositionsHistory = {};

if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let onRenderComplete = function initialRenderComplete() {
  const elem = document.getElementById('css');

  if (elem) elem.parentNode.removeChild(elem);

  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title;

    updateMeta('description', route.description);

    let scrollX = 0;
    let scrollY = 0;
    const pos = scrollPositionsHistory[location.key];

    if (pos) {
      scrollX = pos.scrollX;
      scrollY = pos.scrollY;
    } else {
      const targetHash = location.hash.substr(1);

      if (targetHash) {
        const target = document.getElementById(targetHash);

        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top;
        }
      }
    }

    window.scrollTo(scrollX, scrollY);

    if (window.ga) {
      window.ga('send', 'pageview', createPath(location));
    }
  };
};

FastClick.attach(document.body);

const container = document.getElementById('app');
let currentLocation = context.history.location;
let routes = require('./routes').default;

async function onLocationChange(location) {
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  };

  if (context.history.action === 'PUSH') {
    delete scrollPositionsHistory[location.key];
  }

  currentLocation = location;

  try {
    const route = await UniversalRouter.resolve(routes, {
      ...context,
      path: location.pathname,
      query: queryString.parse(location.search),
    });

    if (currentLocation.key === location.key) {
      ReactDOM.render(
        <Provider store={context.store}>
          <App context={context}>{route.component}</App>
        </Provider>,
        container,
        () => onRenderComplete(route, location)
      );
    }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      throw err;
    }

    console.error(err); // eslint-disable-line no-console
    window.location.href = createPath(location);
  }
}

context.history.listen(onLocationChange);
onLocationChange(currentLocation);

if (module.hot) {
  module.hot.accept('./routes', () => {
    routes = require('./routes').default; // eslint-disable-line global-require

    onLocationChange(currentLocation);
  });
}
