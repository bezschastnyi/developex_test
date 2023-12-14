import React, { useState } from 'react';
import CommentForm from "../CommentForm/CommentForm";
import { Button, Modal, Form } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {updateComments} from "../../redux/actions/updateComments";

function CommentList(props) {
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false);

    const [newBody, setNewBody] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const [newName, setNewName] = useState('')
    let fillComments = useSelector((state) => state.comments)

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const handleDeleteComment = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
            const updatedComment = fillComments.filter((comment) => comment.id !== id);
            dispatch(updateComments(updatedComment));
        } catch (error) {
            console.error('Помилка при видаленні посту:', error);
        }
    };

    const handleSaveComment = async () => {
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
                postId: props.postId,
                name: newName,
                body: newBody,
                id: props.id,
                email: newEmail
            });

            const newComment = {
                postId: props.postId,
                id: fillComments.length + 1,
                name: response.data.name,
                body: response.data.body,
                email: response.data.email,
            };
            const commentNew = [newComment, ...fillComments];
            dispatch(updateComments(commentNew));
            setNewBody('');
            setNewEmail('');
            setNewName('');
            handleCloseForm()
        } catch (error) {
            console.error('Помилка при збереження нового посту:', error);
        }
    };

    const filteredComments = fillComments.filter(comment => comment.postId === props.postId);

    return (
        <div>
            <h3>Comments</h3>
            <Button variant="primary" onClick={handleShowForm}>Відповести</Button>
            <div>
                {filteredComments.map((comment) => (
                    <CommentForm key={comment.body}
                                 comment={comment}
                                 body={comment.body}
                                 name={comment.name}
                                 email={comment.email}
                                onDeleteComment={() => handleDeleteComment(comment.id)}/>
                ))}
            </div>

            {/* новий комментар */}
            <Modal show={showForm} onHide={handleCloseForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Новий комментар</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCommentTitle">
                            <Form.Label>Назва</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введить назву коментаря"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCommentBody">
                            <Form.Label>Тіло комментаря</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Введить текст коментаря"
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCommentEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Введить ваш email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onCancel}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleSaveComment}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CommentList;
