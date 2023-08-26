import { toast, ToastPosition } from "react-toastify";

type ToastOptions = {
  message: string;
};

export const useSuccessToast = ({ message }: ToastOptions): void => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT as ToastPosition,
  });
};

export const useWarningToast = ({ message }: ToastOptions): void => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT as ToastPosition,
  });
};

export const useErrorToast = ({ message }: ToastOptions): void => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT as ToastPosition,
  });
};

export const useInfoToast = ({ message }: ToastOptions): void => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT as ToastPosition,
  });
};