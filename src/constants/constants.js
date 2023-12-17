import {toast} from "react-toastify";

export const message = (()=> toast.success('Complete', {
    position: 'bottom-left',
    autoClose: 1000,
}))