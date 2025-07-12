import Swal from 'sweetalert2';

export const showSuccess = (message: string, handleSuccess?: () => void): void => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    allowOutsideClick: false,
    confirmButtonColor: '#F6A92C',
  }).then((result) => {
    if (result.isConfirmed && handleSuccess) {
      handleSuccess();
    }
  });
};
