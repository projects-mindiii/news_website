import Swal from "sweetalert2";
//------Toaster------

export const Toast = Swal.mixin({
  title: 'Whoops!',
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  className: 'toast-message',
  timer: 1800,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});




  



