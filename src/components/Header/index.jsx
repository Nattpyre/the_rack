/* eslint-disable react/no-unused-prop-types */

import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { AppBar, Badge, Divider, Drawer, MenuItem, Subheader } from 'material-ui';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { connect } from 'react-redux';
import Link from '../Link';
import s from './Header.css';

const badgeStyle = {
  width: 20,
  height: 20,
  fontSize: 10,
  top: 10,
  right: 10,
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftMenuOpen: false,
    };
  }

  render() {
    return (
      <div>
        <AppBar
          style={{ position: 'fixed' }}
          title={<Link to="/" className={s.brandName}>The Rack</Link>}
          iconStyleRight={{ marginTop: 0 }}
          onLeftIconButtonTouchTap={() => this.setState({ leftMenuOpen: !this.state.leftMenuOpen })}
          iconElementRight={
            <Badge
              badgeContent={this.props.cart.products.length}
              secondary
              badgeStyle={badgeStyle}
              className={s.badge}
            >
              <Link className={s.cart} to="/cart">
                <ShoppingCart color="white" />
              </Link>
            </Badge>
          }
        />
        <Drawer
          className={s.leftMenu}
          docked={false}
          open={this.state.leftMenuOpen}
          onRequestChange={() => this.setState({ leftMenuOpen: false })}
        >
          <Subheader>Site menu</Subheader>
          <MenuItem
            rightIcon={<ArrowDropRight />}
            menuItems={[
              <MenuItem><Link className={s.link} to="/men">For Men</Link></MenuItem>,
              <MenuItem><Link className={s.link} to="/women">For Women</Link></MenuItem>,
            ]}
          >
            <Link to="/products">
              Popular Products
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/brands">
              Popular Brands
            </Link>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Link to="/cart">
              Cart
            </Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {
  cart: PropTypes.shape({
    products: PropTypes.array.isRequired,
  }),
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export default withStyles(s)(ConnectedHeader);
