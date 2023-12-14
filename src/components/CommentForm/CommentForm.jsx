import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

const CommentForm = ({ comment, onDeleteComment }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedName, setEditedName] = useState(comment.name);
    const [editedEmail, setEditedEmail] = useState(comment.email);
    const [editedBody, setEditedBody] = useState(comment.body);

    const handleEdit = () => {
        setShowEditModal(true);
    };


    const handleDelete = () => {
        onDeleteComment();
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/comments/${comment.id}`, {
                postId: comment.postId,
                name: editedName,
                body: editedBody,
                id: comment.id,
                email: editedEmail
            });

            comment.name = editedName;
            comment.body = editedBody;
            comment.email = editedEmail;

            setShowEditModal(false);
        } catch (error) {
            console.error('Помилка при редагуванні поста:', error);
        }
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{editedName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{editedEmail}</Card.Subtitle>
                <Card.Text>{editedBody}</Card.Text>
                <Button variant="primary" onClick={handleEdit}>
                    Редактировать
                </Button>
                <Button variant="danger" className="ml-2" onClick={handleDelete}>
                    Удалить
                </Button>
            </Card.Body>

            {/* Редагування коментаря */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Редагування коментаря</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditCommentName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditCommentEmail">
                            <Form.Label>Електронна пошта</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введить електронну пошту"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditCommentBody">
                            <Form.Label>Текст комментаря</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введить текст"
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Відміна
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Зберегти
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default CommentForm;
