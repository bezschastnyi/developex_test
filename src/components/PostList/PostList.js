import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostDetail from '../PostDetail/PostDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { updatePosts } from '../../redux/actions/updatePosts';
import { getAllPosts } from '../../redux/actions/posts';
import { getComments } from '../../redux/actions/comments';
import ModalPost from '../Modal/ModalPost/ModalPost';
import useApi from '../../hooks/useApi';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { message } from '../../constants/constants';

function PostList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [showModal, setShowModal] = useState(false);

    const api = useApi();

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        api.getPosts().then((data) => dispatch(getAllPosts(data)));

        api.getAllComments().then((data) => dispatch(getComments(data)));
    }, []);

    let fillPosts = useSelector((state) => state.posts);
    let fillComments = useSelector((state) => state.comments);

    let postAndComments = fillPosts.map((item1) => {
        const mergeComments = fillComments.filter((item2) => item2.postId === item1.id);
        if (mergeComments) {
            const comments = [mergeComments];
            return { ...item1, comments };
        }
        return item1;
    });

    const handleDeletePost = async (postId) => {
        try {
            await api.removePost(postId);
            const updatedPost = fillPosts.filter((post) => post.id !== postId);
            dispatch(updatePosts(updatedPost));
        } catch (error) {
            console.error('Error deleting a post:', error);
        }
    };

    const filteredPosts = postAndComments.filter(
      (post) =>
        post.title?.includes(searchTerm) ||
        post.body?.includes(searchTerm) ||
        post.comments?.some(
          (comment) =>
            comment.name?.includes(searchTerm) ||
            comment.body?.includes(searchTerm) ||
            comment.email?.includes(searchTerm)
        )
    );

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSavePost = async () => {
        try {
            const response = await api.newPost({
                title: newPostTitle,
                body: newPostBody,
            });
            const newPost = {
                id: fillPosts.length + 1,
                title: response.title,
                body: response.body,
                comments: [],
            };
            const postNew = [newPost, ...fillPosts];
            dispatch(updatePosts(postNew));
            setNewPostTitle('');
            setNewPostBody('');
            handleCloseModal();
            message();
        } catch (error) {
            console.error('Error creating a new post:', error);
        }
    };

    const handleSearchChange = (e) => {
        const searchTerm = e.target.value;
        setSearchTerm(searchTerm);
    };

    return (
      <div className="container mt-4">
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <label htmlFor="language">{t('Select Language')}: </label>
              <select id="language" onChange={(e) => changeLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="ukr">Українська</option>
              </select>
          </div>
          <div className="d-flex justify-content-between mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={t('Search...')}
                value={searchTerm}
                onChange={handleSearchChange}
              />
          </div>
          <Button variant="primary" onClick={handleShowModal}>
              {t('New post')}
          </Button>

          <ModalPost
            show={showModal}
            onHide={() => setShowModal(false)}
            title={t('New Post')}
            onSave={handleSavePost}
            labelTitle={t('New Post Title')}
            labelBody={t('New Post Text')}
            valueTitle={newPostTitle}
            onChangeTitle={setNewPostTitle}
            valueBody={newPostBody}
            onChangeBody={setNewPostBody}
          />

          {searchTerm && filteredPosts.length === 0 ? (
            <p>{t('No matching posts found.')}</p>
          ) : (
            <>
                <h2>{t('Posts')}</h2>
                <ul className="list-group">
                    {filteredPosts.map((post) => (
                      <li className="list-group-item" key={post.id}>
                          <PostDetail
                            searchTerm={searchTerm}
                            item={post}
                            onDeletePost={() => handleDeletePost(post.id)}
                          />
                      </li>
                    ))}
                </ul>
            </>
          )}
      </div>
    );
}

export default PostList;
