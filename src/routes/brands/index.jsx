import React from 'react';
import _ from 'lodash';
import fetch from '../../core/fetch';
import NotFound from '../notFound';
import Brand from './Brand';
import BrandsList from '../../components/BrandsList';
import Layout from '../../components/Layout';

export default {

  path: '/brands',
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
            query: '{brands{name,description,logo,vanityName}}',
          }),
          credentials: 'include',
        });

        const { data } = await resp.json();

        if (!data || !data.brands) throw new Error('Failed to load initial data.');

        return {
          title: 'Brands',
          component: <Layout><BrandsList brands={data.brands} /></Layout>,
        };
      },
    },
    {

      path: '/:name',

      async action({ params }) {
        const resp = await fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `{brands(name:"${params.name}"){name,description,logo,products{name,price,photos,article}}}`,
          }),
          credentials: 'include',
        });

        const { data } = await resp.json();

        if (!data) throw new Error('Failed to load initial data.');

        if (_.isEmpty(data.brands)) {
          return NotFound.action();
        }

        const brand = _.head(data.brands);

        return {
          title: brand.name,
          component: <Brand brand={brand} />,
        };
      },
    },
  ],
};
