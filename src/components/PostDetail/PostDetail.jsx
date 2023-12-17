import React, { useState } from 'react';
import CommentList from '../CommentList/CommentList';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalPost from "../Modal/ModalPost/ModalPost";
import useApi from "../../hooks/useApi";
import ModalConfirmation from "../Modal/ModalConfirmation/ModalConfirmation";
import {useTranslation} from "react-i18next";
import {message} from "../../constants/constants";

function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) {
        return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) => {
        return regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part;
    });
}


function PostDetail({searchTerm, item, onDeletePost}) {
    const [showComments, setShowComments] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedPostTitle, setEditedPostTitle] = useState(item.title);
    const [editedPostBody, setEditedPostBody] = useState(item.body);

    const api = useApi()
    const { t } = useTranslation()

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleModalDelete = () => {
        setShowDeleteModal(true);

    };

    const handleDelete = () => {
        setShowDeleteModal(false);
        onDeletePost();
        message()
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
            message()
        } catch (error) {
            console.error('Error editing the post:', error);
        }
    };

    return (
      <div className="card mt-3">
          <div className="card mt-3" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-body">
                  <h3>{highlightSearchTerm(item.title, searchTerm)}</h3>
                  <p>{highlightSearchTerm(item.body, searchTerm)}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button className="btn btn-primary mr-2" onClick={handleEdit}>
                          {t('Edit post')}
                      </button>
                      <button className="btn btn-danger mr-2" onClick={handleModalDelete}>
                          {t('Delete Post')}
                      </button>
                  </div>
                  <div>
                      <button className="btn btn-success" onClick={toggleComments}>
                          {showComments ? t('Hide comments') : t('Show comments')}
                      </button>
                  </div>
              </div>
              {showComments && (
                <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CommentList searchTerm={searchTerm} key={item.id} postId={item.id}/>
                </div>
              )}
          </div>


          <ModalPost
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            title={t('Post Editing')}
            onSave={handleEditPost}
            labelTitle={t('Post Title')}
            labelBody={t('Post Text')}
            valueTitle={editedPostTitle}
            onChangeTitle={setEditedPostTitle}
            valueBody={editedPostBody}
            onChangeBody={setEditedPostBody}
          />

          {/* Delete confirmation */}
          <ModalConfirmation
            title={t('Deleting a post')}
            body={t('Are you sure you want to delete this post?')}
            show={showDeleteModal}
            onCancel={() => setShowDeleteModal(false)}
            onDelete={handleDelete}
          />
      </div>
    );
}

export default PostDetail;
