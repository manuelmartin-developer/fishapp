import Swal from "sweetalert2";

export const Toast = Swal.mixin({
    toast: true,
    position:"top",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí',
    cancelButtonText: "No"
  });