import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export function showSuccessToast(message: string) {
  Toast.fire({
    icon: "success",
    title: message,
    background: "#16a34a", 
    color: "#ffffff",
    iconColor: "#ffffff",
  });
}

export function showErrorToast(message: string) {
  Toast.fire({
    icon: "error",
    title: message,
    background: "#dc2626", 
    color: "#ffffff",
    iconColor: "#ffffff",
  });
}
