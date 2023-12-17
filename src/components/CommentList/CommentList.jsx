import React, {useState, useTransition} from 'react';
import CommentForm from "../CommentForm/CommentForm";
import { Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {updateComments} from "../../redux/actions/updateComments";
import ModalComment from "../Modal/ModalComment/ModalComment";
import useApi from "../../hooks/useApi";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
function CommentList(props) {
    const dispatch = useDispatch()
    const [showForm, setShowForm] = useState(false);
    const [newBody, setNewBody] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newName, setNewName] = useState('')
    const api = useApi()
    const { t } = useTranslation();
    let fillComments = useSelector((state) => state.comments)

    const handleShowForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const handleDeleteComment = async (id) => {
        try {
            await api.removeComment(id);
            const updatedComment = fillComments.filter((comment) => comment.id !== id);
            dispatch(updateComments(updatedComment));

        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSaveComment = async () => {
        try {
            const response = await api.newComment( {
                postId: props.postId,
                name: newName,
                body: newBody,
                id: props.id,
                email: newEmail
            });

            const newComment = {
                postId: props.postId,
                id: fillComments.length + 1,
                name: response.name,
                body: response.body,
                email: response.email,
            };
            const commentNew = [newComment, ...fillComments];
            dispatch(updateComments(commentNew));
            handleCloseForm()
            toast.success('Complete', {
                position: 'bottom-left',
                autoClose: 1000,
            })
        } catch (error) {
            console.error('Error saving a new post:', error);
        }
    };

    const filteredComments = fillComments.filter(comment => comment.postId === props.postId);



    return (
        <div>
            <h3>Comments</h3>
            <Button variant="primary" onClick={handleShowForm}>{t('Answer')}</Button>
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

            {/* new comment */}
            <ModalComment
                show={showForm}
                onHide={() => {setShowForm(false)
                    setNewBody('');
                    setNewEmail('');
                    setNewName('');}}
                title={t('New Comment')}
                onSave={handleSaveComment}
                labelName={t('NameComment')}
                labelBody={t('Comment Body')}
                labelEmail={t('Email')}
                valueName={newName}
                onChangeName={setNewName}
                valueBody={newBody}
                onChangeBody={setNewBody}
                valueEmail={newEmail}
                onChangeEmail={setNewEmail}
            />
        </div>
    );
}

export default CommentList;
