/* eslint-disable react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import { GridList, GridTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Link from '../../components/Link';
import constants from '../../constants';
import s from './ProductsList.css';

const styles = {
  subHeader: {
    fontSize: '1.5rem',
    lineHeight: '3rem',
    padding: '2px 0 0 0',
  },
  divider: {
    marginTop: '1.5rem',
  },
};

const ProductsList = ({ products }) => {
  const hasProducts = !_.isEmpty(products);

  return (
    <div className={s.container}>
      <GridList
        cellHeight={hasProducts ? 200 : 50}
        cols={5}
      >
        <Subheader style={styles.subHeader}>Popular Products</Subheader>
        {hasProducts ?
          products.map((product, index) => (
            <GridTile
              key={index}
              title={product.name}
              subtitle={`for ${product.price}$`}
            >
              <Link to={`/products/${product.article}`} className={s.link}>
                <img
                  src={_.isEmpty(product.photos) ? constants.placeholder : _.head(product.photos)}
                  className={s.photo}
                  alt={product.name}
                />
              </Link>
            </GridTile>
          )) :
            <p>No results found.</p>
        }
      </GridList>
      <Divider style={styles.divider} />
    </div>
  );
};

ProductsList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    photos: PropTypes.array,
    article: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(s)(ProductsList);
