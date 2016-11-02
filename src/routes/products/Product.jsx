/* eslint-disable react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { SelectField, MenuItem, RaisedButton, Snackbar } from 'material-ui';
import AddCart from 'material-ui/svg-icons/action/add-shopping-cart';
import NukaCarousel from 'nuka-carousel';
import { connect } from 'react-redux';
import Link from '../../components/Link';
import Layout from '../../components/Layout';
import constants from '../../constants';
import s from './Product.css';
import { addToCart, removeFromCart } from '../../actions/cart';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarIsOpen: false,
      size: _.head(this.props.sizes),
    };
  }

  changeSize = (event, index, size) => this.setState({ size });

  handleAddToCart = () => {
    this.setState({ snackBarIsOpen: true }, () => {
      this.props.dispatch(
        addToCart(Object.assign({}, this.props.product, { size: this.state.size }))
      );
    });
  };

  handleRemoveFromCart = () => {
    this.setState({ snackBarIsOpen: false }, () => {
      this.props.dispatch(
        removeFromCart(Object.assign({}, this.props.product, { size: this.state.size }))
      );
    });
  };

  render() {
    const { product, sizes } = this.props;
    const carouselOpts = {
      initialSlideHeight: 500,
    };

    return (
      <Layout>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.photos}>
              {
                _.isEmpty(product.photos) ?
                  <img src={constants.placeholder} alt={product.name} />
                  : <NukaCarousel {...carouselOpts}>
                  {product.photos.map((photo, index) => (
                    <img key={index} src={photo} alt={index} className={s.photo} />
                  ))}
                </NukaCarousel>
              }
            </div>
            <div className={s.info}>
              <h1 className={s.productName}>{product.name}</h1>
              from <Link to={`/brands/${product.brand.vanityName}`}>{product.brand.name}</Link>
              <div>
                <SelectField
                  id={product.article}
                  value={this.state.size}
                  floatingLabelText="Please choose size:"
                  onChange={this.changeSize}
                >
                  <MenuItem value="XS" primaryText="XS" disabled={sizes.indexOf('XS') === -1} />
                  <MenuItem value="S" primaryText="S" disabled={sizes.indexOf('S') === -1} />
                  <MenuItem value="M" primaryText="M" disabled={sizes.indexOf('M') === -1} />
                  <MenuItem value="L" primaryText="L" disabled={sizes.indexOf('L') === -1} />
                  <MenuItem value="XL" primaryText="XL" disabled={sizes.indexOf('XL') === -1} />
                </SelectField>
                <div className={s.divider} />
                <RaisedButton
                  onTouchTap={this.handleAddToCart}
                  className={s.addButton}
                  label="Add to Cart"
                  primary
                  icon={<AddCart />}
                />
              </div>
              <h2 className={s.about}>About product</h2>
              <p>{product.description}</p>
              <p>Gender: {product.gender}</p>
              <p>Color: {product.color}</p>
              <p>Price: {product.price}$</p>
              <p>Article: {product.article}</p>
            </div>
          </div>
          <Snackbar
            open={this.state.snackBarIsOpen}
            message={`${product.name} has been added to your cart`}
            action="undo"
            autoHideDuration={constants.autoHide}
            onActionTouchTap={this.handleRemoveFromCart}
            onRequestClose={() => this.setState({ snackBarIsOpen: false })}
          />
        </div>
      </Layout>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    gender: PropTypes.oneOf(['male', 'female', 'unisex']).isRequired,
    price: PropTypes.number.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.oneOf(['XS', 'S', 'M', 'L', 'XL'])).isRequired,
    color: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
    article: PropTypes.string.isRequired,
    brand: PropTypes.shape({
      name: PropTypes.string.isRequired,
      vanityName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.oneOf(['XS', 'S', 'M', 'L', 'XL'])).isRequired,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const ConnectedProduct = connect(mapStateToProps)(Product);

export default withStyles(s)(ConnectedProduct);
