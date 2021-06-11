import React, { useEffect, useState } from 'react';
import { PostCards, Loader, PageNav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as searchReducer from 'reducers/search/search';
import * as postReducer from 'reducers/posts/posts';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const postStore = useSelector((state) => state.posts);
  const searchStore = useSelector((state) => state.search);
  const { currentPosts, pages, pageNum, loading, success } = postStore;
  const { resultTerm } = searchStore;

  const { changePageNum, fetchNextPage, fetchPrevPage, fetchRecentPosts } = bindActionCreators(
    { ...postReducer },
    dispatch
  );

  const changePrev = () => {
    if (pageNum !== 1) {
      changePageNum(false);
    }
  };

  const changeNext = () => {
    if (pages[pageNum]) {
      changePageNum(true);
      fetchRecentPosts();
    }
  };
  return (
    <Loader isLoading={loading}>
      <PageNav
        isSuccess={success}
        changePrev={changePrev}
        changeNext={changeNext}
        pageNum={pageNum}
      />
      <PostCards postData={pages[pageNum]} resultTerm={resultTerm} />
    </Loader>
  );
};

export default PostsContainer;
