import {productTypes} from "../types";

const initialState = []

export function commentsReduser(state = initialState, action) {
    switch (action.type) {
        case productTypes.FILL_COMMENTS:
            return [...state, ...action.payload]
        case productTypes.UPDATE_COMMENTS:
            return [...action.payload]
        default:
            return state
    }
}
