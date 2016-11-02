import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Divider from 'material-ui/Divider';
import Layout from '../../components/Layout';
import ProductsList from '../../components/ProductsList';
import s from './Brand.css';

const Brand = ({ brand }) => (
  <Layout>
    <div className={s.root}>
      <div className={s.container}>
        <img className={s.logo} src={brand.logo} alt={brand.name} />
        <h1>{brand.name}</h1>
        <p>{brand.description}</p>
        <Divider />
      </div>
      <ProductsList products={brand.products} />
    </div>
  </Layout>
);

Brand.propTypes = {
  brand: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    logo: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string),
      article: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default withStyles(s)(Brand);
