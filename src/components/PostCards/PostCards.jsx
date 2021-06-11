import React from 'react';
import PropTypes from 'prop-types';
import { PostCard } from 'components';

const PostCards = ({ postData, resultTerm }) => {
  return (
    <div className="container">
      <h1 tabIndex="0">{resultTerm}</h1>
      {postData.map((eachPost) => {
        const { id, title, url, num_comments, permalink, ups, downs, created_utc, author } =
          eachPost.data;
        return (
          <PostCard
          // key={id }
            key={id + Math.random()}
            title={title}
            titleUrl={url}
            commentsNumber={num_comments}
            commentsUrl={`https://www.reddit.com/${permalink}`}
            upVotes={ups}
            downVotes={downs}
            created={created_utc}
            author={author}
          />
        );
      })}
    </div>
  );
};

PostCards.defaultProps = {
  postData: [],
  resultTerm: ''
};

PostCards.propTypes = {
  resultTerm: PropTypes.string,
  postData: PropTypes.array
};

export default PostCards;
