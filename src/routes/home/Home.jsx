/* eslint-disable react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import Banner from '../../components/Banner';
import BrandsList from '../../components/BrandsList';
import ProductsList from '../../components/ProductsList';
import s from './Home.css';

function Home({ brands, products }) {
  return (
    <Layout>
      <div className={s.root}>
        <Banner />
        <BrandsList brands={brands} />
        <ProductsList products={products} />
      </div>
    </Layout>
  );
}

Home.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    vanityName: PropTypes.string.isRequired,
  })).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
    article: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(s)(Home);
