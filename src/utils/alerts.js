import { toast } from "react-toastify";

export const toastify = (type, message) => {

    if (type === 's') {
        toast.success(message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    if (type === 'e') {
        console.log(type)
        toast.error(message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            className: 'error-toast',
        });
    }
};
