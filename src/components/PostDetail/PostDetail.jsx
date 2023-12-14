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
            console.error('Error deleting post:', error);
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
            console.error('Error editing the post:', error);
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
                    Edit
                </button>
                <button className="btn btn-danger mr-2" onClick={handleDelete}>
                    Delete
                </button>
                <button className="btn btn-success" onClick={toggleComments}>
                    {showComments ? 'Hide comments' : 'Show comments'}
                </button>
            </div>
            {showComments && (
                <div className="card-footer">
                    <CommentList postId={item.id}/>
                </div>
            )}

            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Post editing</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEditPostTitle">
                            <Form.Label>Post title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a title"
                                value={editedPostTitle}
                                onChange={(e) => setEditedPostTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEditPostBody">
                            <Form.Label>Post text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter text"
                                value={editedPostBody}
                                onChange={(e) => setEditedPostBody(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditPost}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete confirmation */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting a post</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeletePost}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PostDetail;
