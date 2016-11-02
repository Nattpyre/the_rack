import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <div style={{ paddingTop: 64 }}>
      {React.Children.only(children)}
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
