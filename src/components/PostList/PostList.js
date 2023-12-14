import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import PostDetail from '../PostDetail/PostDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useDispatch, useSelector} from "react-redux";
import {updatePosts} from "../../redux/actions/updatePosts";

function PostList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [showModal, setShowModal] = useState(false);


    const dispatch = useDispatch();
    let fillPosts = useSelector((state) => state.posts)
    let fillComments = useSelector((state) => state.comments)

    let postAndComments = fillPosts.map(item1 =>{
        const mergeComments = fillComments.filter(item2 => item2.postId === item1.id);
        if (mergeComments){
            const comments = [mergeComments]
            return {...item1, comments}
        }
        return item1;
    })

    const handleDeletePost = async (postId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const updatedPost = fillPosts.filter((post) => post.id !== postId);
            dispatch(updatePosts(updatedPost));
        } catch (error) {
            console.error('Ошибка при удалении поста:', error);
        }
    };

    const filteredPosts = postAndComments.filter(
        (post) =>
            post.title?.includes(searchTerm) ||
            post.body?.includes(searchTerm) ||
            post.comments?.some((comment) =>
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
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
                title: newPostTitle,
                body: newPostBody,
                userId: 1,
            });

            const newPost = {
                id: fillPosts.length + 1,
                title: response.data.title,
                body: response.data.body,
                comments: [],
            };
            const postNew = [newPost, ...fillPosts];
            dispatch(updatePosts(postNew));
            setNewPostTitle('');
            setNewPostBody('');
            handleCloseModal();
        } catch (error) {
            console.error('Помилка при створенні нового посту:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" onClick={handleShowModal}>
                    Новий пост
                </Button>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Новий пост</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNewPostTitle">
                            <Form.Label>Заголовок нового посту</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введіть заголовок"
                                value={newPostTitle}
                                onChange={(e) => setNewPostTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPostBody">
                            <Form.Label>Текст нового посту</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введіть текст"
                                value={newPostBody}
                                onChange={(e) => setNewPostBody(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Закрити
                    </Button>
                    <Button variant="primary" onClick={handleSavePost}>
                        Зберегти
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2>Посты</h2>
            <ul className="list-group">
                {filteredPosts.map((post) => (
                    <li key={post.id} className="list-group-item">
                        <PostDetail
                            searchTerm={searchTerm}
                            // comments={comments}
                            item={post}
                            onDeletePost={() => handleDeletePost(post.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
