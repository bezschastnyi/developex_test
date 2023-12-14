import {productTypes} from "../types";


export function fillComments(data){
    return {
        type: productTypes.FILL_COMMENTS,
        payload:data,
    }
}
export function getComments(){
    return async function (dispatch) {
        const data = await fetch("http://jsonplaceholder.typicode.com/comments")
            .then((res) => res.json());
        dispatch(fillComments(data))
    }
}