import {productTypes} from "../types";


export function fillPosts(data){
    return {
        type: productTypes.FILL_POSTS,
        payload:data,
    }
}
export function getPosts(){
    return async function (dispatch) {
        const data = await fetch("http://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json());
        dispatch(fillPosts(data))
    }
}
