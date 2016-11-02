/* eslint-disable global-require */

export default {

  path: '/',

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

    do {
      route = await next();
    } while (!route);

    route.title = `${route.title || 'Untitled Page'} - The Rack`;
    route.description = route.description || '';

    return route;
  },

};
