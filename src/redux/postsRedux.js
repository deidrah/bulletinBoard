import Axios from 'axios';
import { api } from '../settings.js';

/* selectors */
export const getAll = ({ posts }) => posts.data;

export const getOne = ({posts}, id) => posts.data.filter(post => post.id == id);
export const getOnePost = ({posts}) => posts.onePost;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');
const FETCH_ONE_POST = createActionName('FETCH_ONE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const addPost = payload => {
  return (dispatch) => {
    Axios
      .post(`${api.url}/${api.posts}/add`, payload)
      .then(res => {
        dispatch({ payload, type: ADD_POST });
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updatePost = payload => ({ payload, type: UPDATE_POST });
export const fetchOnePost = payload => ({ payload, type: FETCH_ONE_POST });

/* thunk creators */
export const loadPostsRequest = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${api.url}/${api.posts}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchPostById = (id) => {
  return (dispatch, getState,) => {
    dispatch(fetchStarted());
    console.log('getState', getState());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchOnePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  //console.log('statePart', statePart);
  //console.log('action', action);
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        onePost: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          action.payload,
        ],
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: statePart.data.map(el => {
          return el.id === action.payload.id ?
            action.payload
            : el;
        }),
      };
    }
    default:
      return statePart;
  }
};