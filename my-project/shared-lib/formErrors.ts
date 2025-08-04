import Swal from "sweetalert2";

export const showError = (error: {message?: string}) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: error.message,
    confirmButtonColor: "red",
  })
};
