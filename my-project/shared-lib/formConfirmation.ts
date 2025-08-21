import Swal from "sweetalert2";

export const showConfirmation = (
    handleSuccess: (id?: string) => void,
): void => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(({ isConfirmed }) => {
    if (isConfirmed) handleSuccess();
  });
};