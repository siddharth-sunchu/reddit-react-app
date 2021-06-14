export const initialState = {
  searchTerm: '',
  resultTerm: ''
};

// ACTION TYPES
const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM';
const SET_RESULT_TERM = 'SET_RESULT_TERM';

// ACTIONS
export const updateSearchTerm = (inputValue) => {
  return { type: UPDATE_SEARCH_TERM, payload: inputValue };
};

export const setResultTerm = (value) => {
  return { type: SET_RESULT_TERM, payload: value };
};

// ACTION CREATORS
export const onChangeInputValue = (inputValue) => (dispatch) => {
  return dispatch(updateSearchTerm(inputValue));
};

export const changeResultTerm = (inputValue) => (dispatch) => {
  return dispatch(setResultTerm(inputValue));
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
    default:
      return state;
  }
};

export default search;
