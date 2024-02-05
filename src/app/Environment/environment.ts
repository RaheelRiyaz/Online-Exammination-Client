import Swal from 'sweetalert2';

export const environment = {
  apiBaseUrl: 'http://localhost:5190/api/',
  baseImagePath: 'http://localhost:5190',
  //Confirm Swal 
  fireConfirmSwal: (message: string) => {
    return Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  },


  //Success Swal 
  fireSuccessSwal: (message: string) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1300,
    });
  },


  //Error Swal 
  fireErrorSwal: (message: string) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1300,
    });
  },



  //Input Swal 
  fireInputSwal: async (title: string, type: string = 'text') => {
    const { value: text } = await Swal.fire({
      input: type === 'textarea' ? 'textarea' : 'text',
      inputLabel: `${title} Name`,
      inputPlaceholder: `Write ${title} Name`,
      showCancelButton: true,
    });
    return text;
  },
};
