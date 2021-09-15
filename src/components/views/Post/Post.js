import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { fetchPostById } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Post.module.scss';
import { settings } from '../../../settings.js';

const Component = ({ className, match, post, user,loadPost }) => {
  useEffect(() => {
    loadPost(match.params.id);
  }, [match.params.id]);
console.log(post)
  return (
  <div className={clsx(className, styles.root)}>
    <Container maxWidth="lg">

      {!post && 'loading'}

        {post && <>
        <Card key={post.id} className={styles.card}>
          <div className='row'>
            <CardHeader title={post.title} overflow="auto" subheader={`${post.date}/${post.updateDate}`} className={styles.title} />

            {post.price ? <TextField variant="outlined" label="price" overflow="auto" className={styles.price} value={post.price} /> : ''}

            {post.image ?
              <CardMedia
                component="img"
                alt="post image"
                height="140"
                image={post.image || settings.image}
                className={styles.image}
              />
              : ''
            }
          </div>

          <div className="row">
            <CardContent className={styles.contentWrapper}>
              <TextField variant="outlined" value={post.content} overflow="auto" className={styles.content} />

              <div className={styles.status}>
                <i>{post.status}</i>
              </div>
              <div className={styles.contact}>
                <h3>Contact details</h3>
                <p>E-mail: {post.mail}</p>
                {post.phone ? <p>Phone number: {post.phone}</p> : ''}
              </div>
            </CardContent>
          </div>

          {user.logged && user.id === post.userId ?
            <CardActions className={styles.link}>
              <Button size="small" color="secondary" variant="contained" href={`/posts/${post.id}/edit`}>
                Edit
              </Button>
            </CardActions>
            : ''
          }

        </Card>

        </>}


    </Container>
  </div>
);
        }

Component.propTypes = {
  className: PropTypes.string,
  post: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  post: state.posts.onePost,
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  loadPost: (id) => dispatch(fetchPostById(id)),
});

const PostContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};