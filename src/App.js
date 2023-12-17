import React from 'react';
import PostList from './components/PostList/PostList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Localization/i18n';

function App() {
    return (
        <>
            <PostList />
            <ToastContainer />
        </>
    );
}
export default App;