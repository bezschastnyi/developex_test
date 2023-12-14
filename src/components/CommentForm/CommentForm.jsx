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
            console.error('An error occurred while editing the post:', error);
        }
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{editedName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{editedEmail}</Card.Subtitle>
                <Card.Text>{editedBody}</Card.Text>
                <Button variant="primary" onClick={handleEdit}>
                    Edit
                </Button>
                <Button variant="danger" className="ml-2" onClick={handleDelete}>
                    Remove
                </Button>
            </Card.Body>

            {/* Editing a comment */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editing a comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditCommentName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the name"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditCommentEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditCommentBody">
                            <Form.Label>Comment text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter text"
                                value={editedBody}
                                onChange={(e) => setEditedBody(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEdit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default CommentForm;
