/* eslint-disable import/no-extraneous-dependencies, react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _ from 'lodash';
import { GridList, GridTile } from 'material-ui/GridList';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Link from '../../components/Link';
import s from './BrandsList.css';

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

function BrandsList({ brands }) {
  const hasBrands = !_.isEmpty(brands);

  return (
    <div className={s.container}>
      <GridList
        cellHeight={hasBrands ? 200 : 50}
        cols={5}
      >
        <Subheader style={styles.subHeader}>Popular Brands</Subheader>
        {hasBrands ?
          _.map(brands, (brand, index) => (
            <GridTile key={index}>
              <Link to={`/brands/${brand.vanityName}`} className={s.link}>
                <img src={brand.logo} alt={brand.name} className={s.logo} />
              </Link>
            </GridTile>
          ))
          :
            <p>No results found.</p>
        }
      </GridList>
      <Divider style={styles.divider} />
    </div>
  );
}

BrandsList.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    vanityName: PropTypes.string.isRequired,
  })).isRequired,
};

export default withStyles(s)(BrandsList);
