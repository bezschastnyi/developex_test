import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import CommentList from '../CommentList/CommentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

function PostDetail({searchTerm, item, comments, onDeletePost}) {
    const [showComments, setShowComments] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPostTitle, setEditedPostTitle] = useState(item.title);
    const [editedPostBody, setEditedPostBody] = useState(item.body);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleDeletePost = async () => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${item.id}`);
            setShowDeleteModal(false);
            onDeletePost();
        } catch (error) {
            console.error('Помилка при видаленні посту:', error);
        }
    };

    const handleEditPost = async () => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
                title: editedPostTitle,
                body: editedPostBody,
                id: item.id,
                userId: item.userId
            });

        item.title = editedPostTitle;
        item.body = editedPostBody

            setShowEditModal(false);
        } catch (error) {
            console.error('Помилка при редагуванні посту:', error);
        }
    };

    return (
        <div className="card mt-3">
            <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary mr-2" onClick={handleEdit}>
                    Редагувати
                </button>
                <button className="btn btn-danger mr-2" onClick={handleDelete}>
                    Видалити
                </button>
                <button className="btn btn-success" onClick={toggleComments}>
                    {showComments ? 'Сховати комментарі' : 'Показати комментарі'}
                </button>
            </div>
            {showComments && (
                <div className="card-footer">
                    <CommentList postId={item.id}/>
                </div>
            )}

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование поста</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditPostTitle">
                            <Form.Label>Заголовок поста</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введіть заголовок"
                                value={editedPostTitle}
                                onChange={(e) => setEditedPostTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPostBody">
                            <Form.Label>Текст поста</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введіть текст"
                                value={editedPostBody}
                                onChange={(e) => setEditedPostBody(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleEditPost}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Підтвердження видалення */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Видалення посту</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ви впевнені, що хочите видалити цей пост?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Відміна
                    </Button>
                    <Button variant="danger" onClick={handleDeletePost}>
                        Видалити
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PostDetail;
