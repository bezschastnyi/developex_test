import {productTypes} from "../types";

export function getAllPosts(data){
    return {
        type: productTypes.FILL_POSTS,
        payload:data,
    }
}
