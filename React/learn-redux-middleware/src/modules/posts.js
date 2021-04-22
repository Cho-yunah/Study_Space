import * as postsAPI from "../api/posts";
import {
  createPromiseThunk,
  handleAsyncActions,
  reducerUtils,
} from "../lib/asyncUtils";

// action type 선언
const GET_POSTS = "GET_POSTS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

// action creator
export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = id => async dispatch => {
 dispatch({type: GET_POST, meta: id});
 try {const payload = await postsAPI.getPostById(id)
  dispatch({typte: GET_POST_SUCCESS, payload, meta: id})
} catch(e) {
  dispatch({
    type: GET_POST_ERROR, payload: e, error: true, meta: id
  })
}
}

// initialState
const initialState = {
  posts: reducerUtils.initial(),
  post: {},
};

const getPostsReducer = handleAsyncActions(GET_POSTS, "posts");
const getPostReduce = (state, action) => {
  const id= action.meta;
  switch(action.type) {
    case GET_POST: return {
      ...state, post: {...state.post, [id]: reducerUtils.loading(state.post[id] && state.post[id].data) }
    }
    default : return state,
  }
}

// Reducer function
export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return getPostsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return getPostReduce(state, action);
    default:
      return state;
  }
}
