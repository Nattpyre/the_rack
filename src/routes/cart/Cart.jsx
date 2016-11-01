/* eslint-disable react/no-unused-prop-types */

import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../../components/Layout';
import Link from '../../components/Link';
import constants from '../../constants';
import s from './Cart.css';
import * as cartActions from '../../actions/cart';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarIsOpen: false,
      removedProduct: null,
    };
  }

  addToCart = () => {
    const product = this.state.removedProduct;

    this.setState({
      snackBarIsOpen: false,
      removedProduct: null,
    }, () => this.props.addToCart(product));
  };

  removeFromCart = (product) => {
    this.setState({
      snackBarIsOpen: true,
      removedProduct: product,
    }, () => this.props.removeFromCart(product));
  };

  render() {
    const products = this.props.cart.products;
    let total = 0;

    return (
      <Layout>
        <div className={s.container}>
          <h1>Your cart</h1>
          {_.isEmpty(products) ?
            <p>No results found.</p>
            :
              <Table fixedHeader={false} fixedFooter={false} style={{ tableLayout: 'auto' }}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Product</TableHeaderColumn>
                    <TableHeaderColumn>Color</TableHeaderColumn>
                    <TableHeaderColumn>Size</TableHeaderColumn>
                    <TableHeaderColumn>Price</TableHeaderColumn>
                    <TableHeaderColumn colSpan={2}>Amount</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {_.uniqWith(products, _.isEqual).map((product, index) => {
                    const amount = _.filter(products, item => _.isEqual(product, item)).length;

                    total += product.price * amount;

                    return (
                      <TableRow key={index}>
                        <TableRowColumn>
                          <Link className={s.productName} to={`/products/${product.article}`}>
                            <img
                              src={_.isEmpty(product.photos) ?
                                constants.placeholder : _.head(product.photos)}
                              alt={product.name}
                            />
                            {product.name}
                          </Link>
                        </TableRowColumn>
                        <TableRowColumn>{product.color}</TableRowColumn>
                        <TableRowColumn>{product.size}</TableRowColumn>
                        <TableRowColumn>{`${product.price}$`}</TableRowColumn>
                        <TableRowColumn>{amount}</TableRowColumn>
                        <TableRowColumn style={{ textAlign: 'right' }}>
                          <IconButton onTouchTap={() => this.removeFromCart(product)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableRowColumn>
                      </TableRow>);
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableRowColumn
                      colSpan={5}
                      style={{ textAlign: 'right' }}
                    >
                      <h2>Total: {total}$</h2>
                    </TableRowColumn>
                  </TableRow>
                </TableFooter>
              </Table>
          }
          <Snackbar
            open={this.state.snackBarIsOpen}
            message={this.state.removedProduct ?
              `${this.state.removedProduct.name} has been removed from your cart` : ''}
            action="undo"
            autoHideDuration={constants.autoHide}
            onActionTouchTap={this.addToCart}
            onRequestClose={() => this.setState({ snackBarIsOpen: false })}
          />
        </div>
      </Layout>
    );
  }
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
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
    }),
  })),
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...cartActions,
  }, dispatch);
}

const ConnectedCart = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default withStyles(s)(ConnectedCart);
