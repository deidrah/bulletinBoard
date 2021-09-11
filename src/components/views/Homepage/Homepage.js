import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux.js';

import styles from './Homepage.module.scss';

const Component = ({ className, children, posts }) => (
  <div className={clsx(className, styles.root)}>
    <Container maxWidth="lg">
      <Fab color="secondary" aria-label="add" href="/post/add" className={styles.button}>
        <AddIcon />
      </Fab>

      {posts.map(el => (
        <Card key={el.id} className={styles.card}>
          <CardHeader title={el.title} subheader={`${el.date}/${el.updateDate}`}/>
        </Card>
      ))}
    </Container>
    {children}
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const HomepageContainer = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};