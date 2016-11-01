/* eslint-disable global-require */

// The top-level (parent) route
export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    require('./home').default,
    require('./brands').default,
    require('./products').default,
    require('./men').default,
    require('./women').default,
    require('./cart').default,
    require('./notFound').default,
  ],

  async action({ next }) {
    let route;

    // Execute each child route until one of them return the result
    // TODO: move this logic to the `next` function
    do {
      route = await next();
    } while (!route);

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'} - The Rack`;
    route.description = route.description || '';

    return route;
  },

};
