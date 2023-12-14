import React, {useEffect} from 'react';
import PostList from './components/PostList/PostList';
import {getPosts} from "./redux/actions/posts";
import {getComments} from "./redux/actions/comments";
import {useDispatch} from "react-redux";

function App() {

    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(getPosts());
        dispatch(getComments())
    }, []);
    return (
        <>
            <PostList />
        </>
    );
}
export default App;