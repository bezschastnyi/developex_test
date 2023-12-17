import {productTypes} from "../types";

export function getComments(data){
    return {
        type: productTypes.FILL_COMMENTS,
        payload:data,
    }
}