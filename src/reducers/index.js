import { combineReducers } from 'redux';
import posts from './posts/posts'
import search from './search/search'
const rootReducer = combineReducers({
    posts,
    search
});

export default rootReducer;