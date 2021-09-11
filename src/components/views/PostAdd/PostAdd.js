import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';

import clsx from 'clsx';
import shortid from 'shortid';

import { connect } from 'react-redux';
import { getAll, addPost } from '../../../redux/postsRedux.js';

import styles from './PostAdd.module.scss';

const Component = ({ className, addPost }) => {

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = day + '/' + month + '/' + year;

  const titleProps = {
    minLength: 10,
  };

  const contentProps = {
    minLength: 20,
  };

  const [post, setPost] = React.useState({
    id: shortid.generate(),
    date: date,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addPost(post);
  };

  const handleChange = async (event, name) => {
    await setPost({
      ...post,
      [name]: event.target.value,
    });
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="lg">
        <Card className={styles.card}>
          <CardHeader title="Add new post" />
          <form className={styles.form} autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <TextField
              id="title"
              label="Title"
              overflow="auto"
              required
              inputProps={titleProps}
              value={post.title}
              onChange={e => handleChange(e, 'title')}
            />
            <TextField
              id="price"
              label="Price"
              type="number"
              overflow="auto"
              value={post.price}
              onChange={e => handleChange(e, 'price')}
            />
            <input
              accept="image/*"
              className={styles.input}
              id="upload-photo"
              multiple
              type="file"
              onChange={e => handleChange(e, 'image')}
            />
            <TextField
              variant="outlined"
              multiline
              id="content"
              overflow="auto"
              inputProps={contentProps}
              label="Content"
              placeholder="Write your post here"
              rows="10"
              required
              value={post.content}
              onChange={e => handleChange(e, 'content')}
            />
            <TextField
              id="mail"
              label="E-mail"
              overflow="auto"
              type="email"
              required
              value={post.mail}
              onChange={e => handleChange(e, 'mail')}
            />
            <TextField
              id="phone"
              label="Phone number"
              type="number"
              overflow="auto"
              value={post.phone}
              onChange={e => handleChange(e, 'phone')}
            />
            <Button type="submit" color="secondary" variant="contained" className={styles.button}>Save</Button>
            <Button color="secondary" href="/" variant="contained" className={styles.button}>Return</Button>
          </form>
        </Card>
      </Container>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  addPost: PropTypes.func,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPost(post)),
});

const PostAddContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  PostAddContainer as PostAdd,
  Component as PostAddComponent,
};
