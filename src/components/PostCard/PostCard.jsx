import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const PostCard = ({titleUrl, title, comments, commentsUrl, commentsNumber, upVotes, downVotes, created, author }) => {
    return (
        // <div className="panel panel-default">
        <div className="card mb-3"> 
        {/* <div className="panel-body"> */}
        <div className="card-body">
          <h3><a href={titleUrl} tabIndex="0">{title}</a></h3>
          <p><a href={commentsUrl} tabIndex="0">{commentsNumber} {'comments'}</a>, 
              <span tabIndex="0"> {upVotes}  {(upVotes > 2) ? 'up votes' : 'up vote'}</span>, 
              <span tabIndex="0"> {downVotes}  {(downVotes > 2) ? 'down votes' : 'down vote'}</span>
          </p>
          <p className="text-muted" tabIndex="0">Posted about {moment(new Date(created * 1000)).fromNow()}  by {author}</p>
        </div>
      </div>
    )
};

export default PostCard;