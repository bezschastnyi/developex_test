import {productTypes} from "../types";


export function updatePosts(data){
    return {
        type: productTypes.UPDATE_POSTS,
        payload:data,
    }
}