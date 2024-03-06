import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const notify = (type , msg) => {

    if(type === 's'){
        toast.success(msg, {
          position: "top-center"
        });
    }
    if(type === 'e'){
        toast.error("Error Notification !", {
          position: "top-left"
        });
    }


    // toast("Custom Style Notification with css class!", {
    //   position: "bottom-right",
    //   className: 'foo-bar'
    // });
  };
