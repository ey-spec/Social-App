import { toast, type ToastOptions } from "react-toastify";

const base: ToastOptions = {
  position: "bottom-right",
  autoClose: false,
  closeOnClick: true,
  draggable: true,
  hideProgressBar: true,
};

export const showSuccessToast = (message: string) =>
  toast.success(message, base);

export const showErrorToast = (message: string) =>
  toast.error(message, base);