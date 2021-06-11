import { fetchPosts } from 'api';
// import { chuckPosts } from 'utils';

import { mockDataAPI } from '../../mocks/data';

export const initialState = {
  error: false,
  success: false,
  loading: false,
  currentPosts: [],
  pages: { 1: [] },
  afterId: null,
  pageNum: 1
};

// ACTION TYPES
const FETCH_POSTS = 'FETCH_POSTS';
const FETCH_ERROR = 'FETCH_ERROR';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const IS_LOADING = 'IS_LOADING';
const SET_BEFORE_ID = 'SET_BEFORE_ID';
const SET_AFTER_ID = 'SET_AFTER_ID';

const ADD_PAGE_NUM = 'ADD_PAGE_NUM';
const SUBTRACT_PAGE_NUM = 'SUBTRACT_PAGE_NUM';

export const addPageNum = () => {
  return { type: ADD_PAGE_NUM };
};

export const subtractPageNum = () => {
  return { type: SUBTRACT_PAGE_NUM };
};

export const changePageNum = (changeValue) => (dispatch) => {
  if (changeValue) {
    return dispatch(addPageNum());
  }
  return dispatch(subtractPageNum());
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

export const setBeforeID = (id) => {
  return { type: SET_BEFORE_ID, payload: id };
};

export const setAfterID = (id) => {
  return { type: SET_AFTER_ID, payload: id };
};

export const fetchRecentPosts = () => async (dispatch, getState) => {
  try {
    dispatch(isLoading());
    const { search, posts } = getState();
    const { searchTerm } = search;
    const { pages, afterId, pageNum } = posts;
    // const response = mockDataAPI[searchTerm];
    if (!pages[pageNum] || afterId === null) {
      // const response = mockDataAPI[`data${pageNum}`];
      let response = await fetchPosts(searchTerm, afterId);
      response = response.data;
      dispatch(fetchSuccess());
      dispatch(setRecentPosts(response.children, pageNum));
      dispatch(setAfterID(response.after));
    }
  } catch (error) {
    return dispatch(fetchError());
  }
};

export const fetchNextPage = () => async (dispatch, getState) => {
  try {
    dispatch(isLoading());
    const { search, posts } = getState();
    const { resultTerm } = search;
    const { pages, afterId, pageNum } = posts;

    if (!pages[pageNum]) {
      // const response = mockDataAPI[`data${pageNum}`];
      let response = await fetchPosts(resultTerm, afterId);
      response = response.data;
      dispatch(fetchSuccess());
      dispatch(setRecentPosts(response.children, pageNum));
      dispatch(setAfterID(response.after));
    }
  } catch (error) {
    dispatch(fetchError());
  }
};

export const fetchPrevPage = () => (dispatch, getState) => {
  try {
    // dispatch(isLoading());
    const { posts } = getState();
    const { pages, pageNum } = posts;
    const response = mockDataAPI[`data${pageNum}`];
    // dispatch(fetchSuccess());
    dispatch(setRecentPosts(response.children, pageNum));
    dispatch(setAfterID(response.after));
  } catch (error) {
    dispatch(fetchError());
  }
};

// export const fetchRecentPosts = () => async (dispatch, getState) => {
//   try {
//     dispatch(isLoading());
//     const { search, posts } = getState();
//     const { searchTerm, pageNum } = search;
//     const { pages, afterId } = posts;
//     const currentList = pages[pageNum];
//     // const postList = await fetchPosts(searchTerm, afterId);
//     const postList = await fetchPosts(searchTerm);
//     const { data } = postList;
//     const pageHashMap = chuckPosts(data.children);
//     console.log(pageHashMap)
//     setBeforeAndAfterIds(data, dispatch);
//     return dispatch(setRecentPosts(data, pageNum, pageHashMap));
//     // return dispatch(setRecentPosts(data, pageNum));
//   } catch (error) {
//     return dispatch(fetchError);
//   }
// };

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        loading: false,
        error: false,
        currentPosts: action.payload.posts,
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
    // case SET_BEFORE_ID:
    //   return {
    //     ...state,
    //     beforeId: action.payload
    //   };

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
    default:
      return state;
  }
};

export default posts;
