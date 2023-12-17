import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import {useTranslation} from "react-i18next";

const DeleteConfirmationModal = ({ title, body, show, onCancel, onDelete }) => {
    const { t } = useTranslation()

    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    {t('Cancel')}
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    {t('DeleteModal')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;
