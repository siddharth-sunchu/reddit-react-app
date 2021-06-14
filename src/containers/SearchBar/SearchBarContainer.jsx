import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postReducer from 'reducers/posts/posts';
import * as searchReducer from 'reducers/search/search';
import { SearchButton, SearchInput } from 'components';

const SearchBarContainer = () => {
  const searchStore = useSelector((state) => state.search);
  const { searchTerm } = searchStore;
  const dispatch = useDispatch();
  const { fetchRecentPosts, onChangeInputValue, changeResultTerm, clearOldPosts } = bindActionCreators(
    { ...postReducer, ...searchReducer },
    dispatch
  );

  const onClickSearch = (event) => {
    event.preventDefault();
    clearOldPosts();
    fetchRecentPosts(searchTerm);
    changeResultTerm(searchTerm);
  };

  const onChangeInput = (event) => {
    clearOldPosts();
    changeResultTerm('')
    onChangeInputValue(event.target.value);
  };

  return (
    <SearchInput onChange={onChangeInput} value={searchTerm}>
      <SearchButton onClick={onClickSearch} />
    </SearchInput>
  );
};

export default SearchBarContainer;
