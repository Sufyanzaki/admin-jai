import Swal from 'sweetalert2';
import {determinePosition} from './misc';

let timerInterval: ReturnType<typeof setInterval>;

export const showSuccess = (message: string, handleSuccess?: () => void): void => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    allowOutsideClick: false,
    confirmButtonColor: '#F6A92C',
    timer: 2000,
    didOpen: () => {
      const timer = Swal.getPopup()?.querySelector('b');
      if (timer) {
        timerInterval = setInterval(() => {
          const timerLeft = Swal.getTimerLeft();
          if (timerLeft !== null) {
            timer.textContent = `${timerLeft}`;
          }
        }, 5000);
      }
    },
    willClose: () => {
      clearInterval(timerInterval);
      handleSuccess?.();
    },
    position: determinePosition()
  }).then((result) => {
    if (result.isConfirmed && handleSuccess) {
      handleSuccess();
    }
  });
};
