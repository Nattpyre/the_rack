import React from 'react';
import Home from './Home';
import fetch from '../../core/fetch';

export default {

  path: ['/', '/home'],

  async action() {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: '{brands(limit:5){name,logo,vanityName},products{name,price,photos,article}}',
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    if (!data || !data.brands || !data.products) throw new Error('Failed to load initial data.');

    return {
      title: 'Home',
      component: <Home brands={data.brands} products={data.products} />,
    };
  },

};
