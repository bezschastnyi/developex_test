
export default function useApi() {
    const url = "https://jsonplaceholder.typicode.com";


    async function getPosts() {
        const allPosts = await fetch(`${url}/posts`)
            .then((res) => res.json())
            .catch((err) => err);
        return allPosts;
    }

    async function getAllComments() {
        const allComment = await fetch(`${url}/comments`)
            .then((res) => res.json())
            .catch((err) => err);
        return allComment;
    }

    async function newPost({ title, body, userId }) {
        const postNewPost = await fetch(`${url}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                body,
                userId,
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);

        return postNewPost;
    }

    async function newComment({ postId, body, email, id, name }) {
        const commentNewComment = await fetch(`${url}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId,
                name,
                body,
                id,
                email
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);

        return commentNewComment;
    }

    async function removePost(postId) {
        const deletePost = await fetch(`${url}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((err) => err);
        return deletePost;
    }

    async function removeComment(id) {
        const deleteComment = await fetch(`${url}/posts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((err) => err);
        return deleteComment;
    }

    async function editComment({ id, postId, email, name, body }) {
        const putComment = await fetch(`${url}/comments/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId,
                name,
                body,
                id,
                email
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);
        return putComment;
    }

    async function editPost({ title, body, userId, id }) {
        const putPost = await fetch(`${url}/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                body,
                userId,
                id,
            }),
        })
            .then((res) => res.json())
            .catch((err) => err);
        return putPost;
    }

    return {
        getPosts,
        getAllComments,
        newPost,
        newComment,
        removePost,
        removeComment,
        editComment,
        editPost
    };
}