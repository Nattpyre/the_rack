import React from 'react';
import Cart from './Cart';

export default {

  path: '/cart',
  children: [
    {

      path: '/',

      action() {
        return {
          title: 'Cart',
          component: <Cart />,
        };
      },
    },
  ],
};
