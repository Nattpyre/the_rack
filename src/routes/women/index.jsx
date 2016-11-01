import React from 'react';
import fetch from '../../core/fetch';
import ProductsList from '../../components/ProductsList';
import Layout from '../../components/Layout';

export default {

  path: '/women',
  children: [
    {

      path: '/',

      async action() {
        const resp = await fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: '{products(gender:female){name,price,photos,article}}',
          }),
          credentials: 'include',
        });

        const { data } = await resp.json();

        if (!data || !data.products) throw new Error('Failed to load initial data.');

        return {
          title: 'For Women',
          component: <Layout><ProductsList products={data.products} /></Layout>,
        };
      },
    },
  ],

};
