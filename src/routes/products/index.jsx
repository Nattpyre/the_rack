import React from 'react';
import _ from 'lodash';
import sorter from 'apparel-sorter';
import fetch from '../../core/fetch';
import NotFound from '../notFound';
import Product from './Product';
import ProductsList from '../../components/ProductsList';
import Layout from '../../components/Layout';

export default {

  path: '/products',
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
            query: '{products{name,price,photos,article}}',
          }),
          credentials: 'include',
        });

        const { data } = await resp.json();

        if (!data || !data.products) throw new Error('Failed to load initial data.');

        return {
          title: 'Products',
          component: <Layout><ProductsList products={data.products} /></Layout>,
        };
      },
    },
    {

      path: '/:article',

      async action({ params }) {
        const resp = await fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `{
                      products(article:"${params.article}") {
                        name, 
                        description, 
                        gender, 
                        price, 
                        sizes,
                        color,
                        photos,
                        article,
                        brand {
                          name,
                          vanityName
                        }
                      }
                    }`,
          }),
          credentials: 'include',
        });

        const { data } = await resp.json();

        if (!data) throw new Error('Failed to load initial data.');

        if (_.isEmpty(data.products)) {
          return NotFound.action();
        }

        const product = _.head(data.products);

        return {
          title: product.name,
          component: <Product product={product} sizes={sorter.sort(product.sizes)} />,
        };
      },

    },
  ],

};
