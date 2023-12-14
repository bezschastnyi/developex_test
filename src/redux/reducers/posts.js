import {productTypes} from "../types";

const initialState = []

export function postsReduser(state = initialState, action) {
    switch (action.type) {
        case productTypes.FILL_POSTS:
            return [...state, ...action.payload]
        case productTypes.UPDATE_POSTS:
            return [...action.payload]
        default:
            return state
    }
}
