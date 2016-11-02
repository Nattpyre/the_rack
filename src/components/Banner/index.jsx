import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import forMenUrl from './for-men.jpg';
import forWomenUrl from './for-women.jpg';
import Link from '../Link';
import s from './Banner.css';

const Banner = () => (
  <div className={s.root}>
    <Link
      to="/men"
      className={s.container}
      style={{ backgroundImage: `url(${forMenUrl})` }}
    >
      For Men
    </Link>
    <Link
      to="/women"
      className={s.container}
      style={{ backgroundImage: `url(${forWomenUrl})` }}
    >
      For Women
    </Link>
  </div>
);

export default withStyles(s)(Banner);
