import { fetchPosts } from 'api';
import { filterExtraPosts } from 'utils';

export const initialState = {
  error: false,
  success: false,
  loading: false,
  pages: { 1: [] },
  afterId: null,
  pageNum: 1
};

// ACTION TYPES
const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_ERROR = 'FETCH_ERROR';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const IS_LOADING = 'IS_LOADING';
const SET_AFTER_ID = 'SET_AFTER_ID';

const ADD_PAGE_NUM = 'ADD_PAGE_NUM';
const SUBTRACT_PAGE_NUM = 'SUBTRACT_PAGE_NUM';
const CLEAR_POSTS = 'CLEAR_POSTS';

export const addPageNum = () => {
  return { type: ADD_PAGE_NUM };
};

export const subtractPageNum = () => {
  return { type: SUBTRACT_PAGE_NUM };
};

// ACTIONS
export const setRecentPosts = (posts, pageNum) => {
  return { type: FETCH_POSTS, payload: { posts, pageNum } };
};

export const fetchError = () => {
  return { type: FETCH_ERROR };
};

export const isLoading = () => {
  return { type: IS_LOADING };
};

export const fetchSuccess = () => {
  return { type: FETCH_SUCCESS };
};

export const setAfterID = (id) => {
  return { type: SET_AFTER_ID, payload: id };
};

export const clearPosts = () => {
  return { type: CLEAR_POSTS };
};

export const clearOldPosts = () => (dispatch) =>{
  return dispatch(clearPosts());
};

export const nextPage = () => (dispatch, getState) => {
  dispatch(addPageNum());
  const { posts } = getState();
  const { pageNum, pages } = posts;
  if (!pages[pageNum]) {
    dispatch(fetchRecentPosts());
  }
};

export const prevPage = () => (dispatch, getState) => {
  const { posts } = getState();
  const { pageNum } = posts;
  if (pageNum !== 1) {
    return dispatch(subtractPageNum());
  }
};

export const fetchRecentPosts = () => async (dispatch, getState) => {
  try {
    dispatch(isLoading());
    const { search, posts } = getState();
    const { searchTerm } = search;
    const { pages, afterId, pageNum } = posts;
    if (!pages[pageNum] || afterId === null) {
      let response = await fetchPosts(searchTerm, afterId);
      // Handling Sticked Post
      response = filterExtraPosts(response.data);
      dispatch(fetchSuccess());
      dispatch(setRecentPosts(response.children, pageNum));
      dispatch(setAfterID(response.after));
    }
  } catch (error) {
    return dispatch(fetchError());
  }
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        loading: false,
        error: false,
        pages: {
          ...state.pages,
          [action.payload.pageNum]: action.payload.posts
        }
      };
    case FETCH_ERROR:
      return {
        ...state,
        error: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        success: true,
        error: false,
        loading: false
      };
    case IS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_AFTER_ID:
      return {
        ...state,
        afterId: action.payload
      };
    case ADD_PAGE_NUM:
      return {
        ...state,
        pageNum: state.pageNum + 1
      };
    case SUBTRACT_PAGE_NUM:
      return {
        ...state,
        pageNum: state.pageNum === 1 ? 1 : state.pageNum - 1
      };
    case CLEAR_POSTS:
      return {
        error: false,
        success: false,
        loading: false,
        pages: { 1: [] },
        afterId: null,
        pageNum: 1
      };
    default:
      return state;
  }
};

export default posts;
