import { toast } from "react-toastify";


export function errorHandler(error) {
    toast.error(error);
    return;
}

export function successHandler(message) {
    toast.success(message);
    return;
}