import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: false,
    position:"center",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: "No",
    allowOutsideClick: false
  });

export const Mixin = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  allowOutsideClick: false
});