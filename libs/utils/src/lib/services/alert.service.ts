import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  swalCustom = Swal.mixin({
    customClass: {
      container: '',
      popup: 'alert-popup',
      title: 'alert-title',
      confirmButton: ' alert-confirm',
      denyButton: 'alert-deny',
      icon: 'alert-icon'
    },
    // showCancelButton: true,
    reverseButtons: true,

    buttonsStyling: false,
  });
  constructor(private router: Router) {}
  
  errorRedirectAlert(text = "You won't be able to revert this!" , url = '/app/books' ) {
    this.swalCustom
      .fire({
        title: '🔴 Error!',
        text,
        confirmButtonText: 'OK',
        // buttonsStyling: true
      })
      .then(() => {
        this.router.navigate([url]);
      });
  }
  
  succeRedirectAlert({text = "Your paid was aproved" , confirmButtonText = 'To MyLearning', denyButtonText = 'To Books' , urlDeny = '/app/books' ,  urlConfi= '/app/order/mylearning' }) {
    this.swalCustom
    .fire({
      icon: 'success',
      text,
      showDenyButton: true,
      denyButtonText,
      confirmButtonText,
      // buttonsStyling: true
    })
    .then((result) => {
      if(result.isConfirmed){

        this.router.navigate([urlConfi]);
      }
      else{
        this.router.navigate([urlDeny]);

      }
    });
  }
}



