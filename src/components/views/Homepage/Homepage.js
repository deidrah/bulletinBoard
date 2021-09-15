import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, loadPostsRequest } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    posts: PropTypes.array,
    loadPosts: PropTypes.func,
    user: PropTypes.object,
  }

  componentDidMount() {
    this.props.loadPosts();
  }

  render() {
    const { className, posts, user } = this.props;

    return (
      <div className={clsx(className, styles.root)}>

        <Container maxWidth="lg">
          {user.logged ?
            <Fab color="secondary" aria-label="add" href="/posts/add" className={styles.button}>
              <AddIcon />
            </Fab>
            : ''
          }

          {posts.map(el => (
            <Card key={el.id} className={styles.card}>
              <CardHeader title={el.title} subheader={`${el.date}/${el.updateDate}`} />
              <CardActions className={styles.link}>
                <Button size="small" color="secondary" variant="contained" href={`/posts/${el._id}`}>
                  Show details
                </Button>
              </CardActions>
            </Card>
          ))}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch, state) => ({
  loadPosts: () => dispatch(loadPostsRequest(state)),
});

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};