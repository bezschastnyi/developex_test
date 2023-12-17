import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import {useTranslation} from "react-i18next";

const ModalComment = ({
                          show,
                          onHide,
                          title,
                          onSave,
                          labelName,
                          labelBody,
                          labelEmail,
                          valueName,
                          onChangeName,
                          valueBody,
                          onChangeBody,
                          valueEmail,
                          onChangeEmail,
                      }) => {
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        body: '',
        email: '',
    });

    const schema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Only English letters, numbers, and spaces are allowed')
            .required('Required')
            .min(3, 'Min 3 characters'),
        body: Yup.string()
            .matches(/^[a-zA-Z0-9\s]*$/, 'Only English letters, numbers, and spaces are allowed')
            .required('Required')
            .min(3, 'Min 3 characters'),
        email: Yup.string().email('Invalid email address').required('Invalid email address'),

    });

    const { t } = useTranslation()

    const handleValidation = async () => {
        try {
            await schema.validate({
                name: valueName,
                body: valueBody,
                email: valueEmail,

            });
            setValidationErrors({ name: '', body: '', email: '' });
            return true;
        } catch (error) {
            const errors = {
                name: error.path === 'name' ? error.message : '',
                body: error.path === 'body' ? error.message : '',
                email: error.path === 'email' ? error.message : '',

            };
            setValidationErrors(errors);
            return false;
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
                    <Form.Group controlId="formCommentName">
                        <Form.Label>{labelName}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={`Enter ${labelName?.toLowerCase()}`}
                            value={valueName}
                            onChange={(e) => onChangeName(e.target.value)}
                            isInvalid={!!validationErrors.name}
                        />
                        <Form.Control.Feedback type="invalid" style={{ display: validationErrors.name ? 'block' : 'none' }}>
                            {validationErrors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCommentBody">
                        <Form.Label>{labelBody}</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={`Enter ${labelBody?.toLowerCase()}`}
                            value={valueBody}
                            onChange={(e) => onChangeBody(e.target.value)}
                            isInvalid={!!validationErrors.body}
                        />
                        <Form.Control.Feedback type="invalid" style={{ display: validationErrors.body ? 'block' : 'none' }}>
                            {validationErrors.body}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formCommentEmail">
                        <Form.Label>{labelEmail}</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder={`Enter ${labelEmail?.toLowerCase()}`}
                            value={valueEmail}
                            onChange={(e) => onChangeEmail(e.target.value)}
                            isInvalid={!!validationErrors.email} // Устанавливаем, если есть ошибка
                        />
                        <Form.Control.Feedback type="invalid" style={{ display: validationErrors.email ? 'block' : 'none' }}>
                            {validationErrors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {t('Cancel')}
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {t('Save')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComment;
