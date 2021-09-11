import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../Header/Header';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { getUser } from '../../../redux/userRedux.js';

import styles from './MainLayout.module.scss';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Header />
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  user: PropTypes.object,
};

// const mapStateToProps = state => ({
//   user: getUser(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps)(Component);

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};