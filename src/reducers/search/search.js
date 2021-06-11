import { fetchPosts } from 'api';

export const initialState = {
  searchTerm: '',
  resultTerm: '',
  pageNum: 1
};

// ACTION TYPES
const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
const SET_RESULT_TERM = 'SET_RESULT_TERM';
const ADD_PAGE_NUM = 'ADD_PAGE_NUM';
const SUBTRACT_PAGE_NUM = 'SUBTRACT_PAGE_NUM';

// ACTIONS
export const updateSearchTerm = (inputValue) => {
  return { type: UPDATE_SEARCH_TERM, payload: inputValue };
};

export const setResultTerm = (value) => {
  return { type: SET_RESULT_TERM, payload: value };
};

export const addPageNum = () => {
  return { type: ADD_PAGE_NUM };
};

export const subtractPageNum = () => {
  return { type: SUBTRACT_PAGE_NUM };
};

// ACTION CREATORS
export const onChangeInputValue = (inputValue) => (dispatch) => {
  return dispatch(updateSearchTerm(inputValue));
};

export const changeResultTerm = (inputValue) => (dispatch) => {
  return dispatch(setResultTerm(inputValue));
};

export const changePageNum = (changeValue) => (dispatch) => {
  if (changeValue) {
    return dispatch(addPageNum());
  }
  return dispatch(subtractPageNum());
};

const search = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: payload
      };
    case SET_RESULT_TERM:
      return {
        ...state,
        resultTerm: payload
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

export default search;
