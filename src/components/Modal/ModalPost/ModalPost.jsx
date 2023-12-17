import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import {useTranslation} from "react-i18next";

const ModalComponent = ({
                            show,
                            onHide,
                            title,
                            onSave,
                            labelTitle,
                            labelBody,
                            valueTitle,
                            onChangeTitle,
                            valueBody,
                            onChangeBody
                        }) => {
    const [validationErrors, setValidationErrors] = useState({
        title: '',
        body: ''
    });

    const schema = Yup.object().shape({
        title: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Only English letters, numbers, and spaces are allowed')
            .required('Required')
            .min(3, 'Min 3 characters'),
        body: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Only English letters, numbers, and spaces are allowed')
            .required('Required')
            .min(3, 'Min 3 characters'),
    });

    const { t } = useTranslation()

    const handleValidation = async () => {
        try {
            await schema.validate({
                title: valueTitle,
                body: valueBody
            });
            setValidationErrors({ title: '', body: '' });
            return true; // Validation passed
        } catch (error) {
            const errors = {
                title: error.path === 'title' ? error.message : '',
                body: error.path === 'body' ? error.message : ''
            };
            setValidationErrors(errors);
            return false; // Validation failed
        }
    };

    const handleSubmit = async () => {
        const isValid = await handleValidation();
        if (isValid) {
            onSave();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>{labelTitle}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={`Enter ${labelTitle.toLowerCase()}`}
                            value={valueTitle}
                            onChange={(e) => onChangeTitle(e.target.value)}
                            isInvalid={!!validationErrors.title}
                        />
                        <Form.Control.Feedback type="invalid" style={{ display: validationErrors.title ? 'block' : 'none' }}>
                            {validationErrors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBody">
                        <Form.Label>{labelBody}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={`Enter ${labelBody.toLowerCase()}`}
                            value={valueBody}
                            onChange={(e) => onChangeBody(e.target.value)}
                            isInvalid={!!validationErrors.body}
                        />
                        <Form.Control.Feedback type="invalid" style={{ display: validationErrors.body ? 'block' : 'none' }}>
                            {validationErrors.body}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {t('Close')}
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {t('Save')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;
