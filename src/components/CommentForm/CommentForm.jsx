import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import ModalComment from "../Modal/ModalComment/ModalComment";
import useApi from "../../hooks/useApi";
import ModalConfirmation from "../Modal/ModalConfirmation/ModalConfirmation";
import {toast} from "react-toastify";
import { useTranslation } from 'react-i18next';

const CommentForm = ({ comment, onDeleteComment }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editedName, setEditedName] = useState(comment.name);
    const [editedEmail, setEditedEmail] = useState(comment.email);
    const [editedBody, setEditedBody] = useState(comment.body);
    const [tempEditedName, setTempEditedName] = useState(comment.name);
    const [tempEditedEmail, setTempEditedEmail] = useState(comment.email);
    const [tempEditedBody, setTempEditedBody] = useState(comment.body);

    const api = useApi()
    const { t } = useTranslation();

    const handleEdit = () => {
        setTempEditedName(editedName);
        setTempEditedEmail(editedEmail);
        setTempEditedBody(editedBody);
        setShowEditModal(true);
    };

    const handleDeleteModal = () => {
        setShowDeleteModal(true)
    };

    const handleDelete = () => {
        onDeleteComment();
        toast.success('Complete', {
            position: 'bottom-left',
            autoClose: 1000,
        })
    };

    const handleSaveEdit = async (id) => {
        try {
            await api.editComment( {
                postId: comment.postId,
                name: tempEditedName,
                body: tempEditedBody,
                id: comment.id,
                email: tempEditedEmail
            });

            setEditedName(tempEditedName);
            setEditedBody(tempEditedBody);
            setEditedEmail(tempEditedEmail);
            setShowEditModal(false);
            toast.success('Complete', {
                position: 'bottom-left',
                autoClose: 1000,
            })
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
                    {t('Edit')}
                </Button>
                <Button variant="danger" className="ml-2" onClick={handleDeleteModal}>
                    {t('Delete')}
                </Button>
            </Card.Body>

            {/* Edit comment */}
            <ModalComment
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title={t('Edit comment')}
                onSave={handleSaveEdit}
                labelName={t('Name')}
                labelBody={t('Comment text')}
                labelEmail={t('Email')}
                valueName={tempEditedName}
                onChangeName={setTempEditedName}
                valueBody={tempEditedBody}
                onChangeBody={setTempEditedBody}
                valueEmail={tempEditedEmail}
                onChangeEmail={setTempEditedEmail}
            />

            {/* Delete confirmation */}
            <ModalConfirmation
                title={t('Deleting a comment')}
                body={t('Are you sure you want to delete this comment?')}
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
            />
        </Card>
    );
};

export default CommentForm;
