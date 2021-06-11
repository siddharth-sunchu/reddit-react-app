import React from 'react';
import { SearchBarContainer, PostsContainer } from 'containers'

const DefaultLayout = () => {
    return (
        <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">RedditLite</a>
            </div>
            <SearchBarContainer />
          </div>
        </nav>
        <div className="app-content">
          <PostsContainer />
        </div>
      </div>
    )
}

export default DefaultLayout;
