import {productTypes} from "../types";


export function updateComments(data){
    return {
        type: productTypes.UPDATE_COMMENTS,
        payload:data,
    }
}