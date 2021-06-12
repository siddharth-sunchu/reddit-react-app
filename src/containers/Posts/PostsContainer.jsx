import React from 'react';
import { PostCards, Loader, PageNav } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postReducer from 'reducers/posts/posts';

const PostsContainer = () => {
  const dispatch = useDispatch();
  const postStore = useSelector((state) => state.posts);
  const searchStore = useSelector((state) => state.search);
  const { pages, pageNum, loading, success } = postStore;
  const { resultTerm } = searchStore;

  const { prevPage, nextPage } = bindActionCreators(
    { ...postReducer },
    dispatch
  );

  return (
    <Loader isLoading={loading}>
      <PageNav
        isSuccess={success}
        changePrev={prevPage}
        changeNext={nextPage}
        pageNum={pageNum}
      />
      <PostCards postData={pages[pageNum]} resultTerm={resultTerm} />
    </Loader>
  );
};

export default PostsContainer;
