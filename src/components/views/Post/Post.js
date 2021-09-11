import React from 'react';
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
import { getAll } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import styles from './Post.module.scss';
import { settings } from '../../../settings.js';

const Component = ({ className, match, posts, user }) => (
  <div className={clsx(className, styles.root)}>
    <Container maxWidth="lg">

      {posts.filter(el => el.id === match.params.id).map(el => (
        <Card key={el.id} className={styles.card}>
          <div className='row'>
            <CardHeader title={el.title} overflow="auto" subheader={`${el.date}/${el.updateDate}`} className={styles.title} />

            {el.price ? <TextField variant="outlined" label="price" overflow="auto" className={styles.price} value={el.price} /> : ''}

            {el.image ?
              <CardMedia
                component="img"
                alt="post image"
                height="140"
                image={el.image || settings.image}
                className={styles.image}
              />
              : ''
            }
          </div>

          <div className="row">
            <CardContent className={styles.contentWrapper}>
              <TextField variant="outlined" value={el.content} overflow="auto" className={styles.content} />

              <div className={styles.status}>
                <i>{el.status}</i>
              </div>
              <div className={styles.contact}>
                <h3>Contact details</h3>
                <p>E-mail: {el.mail}</p>
                {el.phone ? <p>Phone number: {el.phone}</p> : ''}
              </div>
            </CardContent>
          </div>

          {user.logged && user.id === el.userId ?
            <CardActions className={styles.link}>
              <Button size="small" color="secondary" variant="contained" href={`/posts/${el.id}/edit`}>
                Edit
              </Button>
            </CardActions>
            : ''
          }

        </Card>
      ))}

    </Container>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const PostContainer = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  PostContainer as Post,
  Component as PostComponent,
};