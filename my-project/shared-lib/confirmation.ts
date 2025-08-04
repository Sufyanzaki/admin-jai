import Swal from 'sweetalert2';

export const showConfirmation = (
  handleDelete: (id?: string) => void,
  id?: string
) => {
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-color');

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: primaryColor === '' ? '#2DC071' : primaryColor,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      handleDelete(id)
    }
  });
};

export const showShareConfirmation = (
  handleShare: (id?: string) => void,
  id?: string
) => {
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-color');

  Swal.fire({
    title: 'Are you want to share again?',
    text: 'This notification will be share again.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: primaryColor === '' ? '#168AF9' : primaryColor,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Share',
  }).then((result) => {
    if (result.isConfirmed) {
      handleShare(id);
      Swal.fire({
        title: 'Shared!',
        text: 'Your notification has been shared.',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    }
  });
};
