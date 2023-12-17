import React, { useState } from 'react';
import CommentList from '../CommentList/CommentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalPost from "../Modal/ModalPost/ModalPost";
import useApi from "../../hooks/useApi";
import ModalConfirmation from "../Modal/ModalConfirmation/ModalConfirmation";
import {toast} from "react-toastify";


function PostDetail({searchTerm, item, comments, onDeletePost}) {
    const [showComments, setShowComments] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPostTitle, setEditedPostTitle] = useState(item.title);
    const [editedPostBody, setEditedPostBody] = useState(item.body);

    const api = useApi()

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleModalDelete = () => {
        setShowDeleteModal(true);

    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        onDeletePost();
        toast.success('Complete', {
            position: 'bottom-left',
            autoClose: 1000,
        })
    };


    const handleEdit = () => {
        setShowEditModal(true);
    };

    const handleEditPost = async (id) => {
        try {
            await api.editComment ({
                title: editedPostTitle,
                body: editedPostBody,
                id: item.id,
                userId: item.userId
            });

        item.title = editedPostTitle;
        item.body = editedPostBody
            setShowEditModal(false);
            toast.success('Complete', {
                position: 'bottom-left',
                autoClose: 1000,
            })
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
                <button className="btn btn-danger mr-2" onClick={handleModalDelete}>
                    Delete
                </button>
                <button className="btn btn-success" onClick={toggleComments}>
                    {showComments ? 'Hide comments' : 'Show comments'}
                </button>
            </div>
            {showComments && (
                <div className="card-footer">
                    <CommentList key={item.id} postId={item.id}/>
                </div>
            )}

            <ModalPost
                show={showEditModal}
                onHide={() => setShowEditModal(false)}
                title="Post Editing"
                onSave={handleEditPost}
                labelTitle="Post Title"
                labelBody="Post Text"
                valueTitle={editedPostTitle}
                onChangeTitle={setEditedPostTitle}
                valueBody={editedPostBody}
                onChangeBody={setEditedPostBody}
            />

            {/* Delete confirmation */}
            <ModalConfirmation
                title={'Deleting a post'}
                body={'Are you sure you want to delete this post?'}
                show={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default PostDetail;
