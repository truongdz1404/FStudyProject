import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/toast/custom-toast.css";

const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: "custom-toast",
    bodyClassName: "custom-toast-body"
  });
};
const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    className: "custom-toast",
    bodyClassName: "custom-toast-body"
  });
};

const CustomToast: React.FC = () => <ToastContainer />;

// eslint-disable-next-line react-refresh/only-export-components
export { CustomToast, showSuccessToast, showErrorToast };
