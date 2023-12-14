// Core
import { combineReducers } from "redux";

// Reducers
import {postsReduser as posts} from "./reducers/posts"
import {commentsReduser as comments} from "./reducers/comments";
// import {updatePostsReduser as update} from "./reducers/updatePosts";



export const rootReducer = combineReducers({ posts, comments});
