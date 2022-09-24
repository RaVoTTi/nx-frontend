import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

interface IRoutes {
  urlConfi?: string;
  urlDeny?: string;
  urlCancel?: string;
}

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
      icon: 'alert-icon',
    },
    // showCancelButton: true,
    reverseButtons: true,

    buttonsStyling: false,
  });
  constructor(private router: Router) {}

  // errorRedirectAlert(text = "You won't be able to revert this!", url?: string) {
  //   this.swalCustom
  //     .fire({
  //       // title: '🔴 Error!',
  //       icon: 'error',
  //       text,
  //       confirmButtonText: 'OK',
  //       // buttonsStyling: true
  //     })
  //     .then(() => {
  //       if (url) {
  //         this.router.navigate([url]);
  //       }
  //     });
  // }

  fire<T = any>(options: SweetAlertOptions<T>, routes?: IRoutes) {
    this.swalCustom.fire({ ...options }).then((result) => {
      if (result.isConfirmed && routes?.urlConfi) {
        this.router.navigate([routes?.urlConfi]);
      } else if (result.isDenied && routes?.urlDeny) {
        this.router.navigate([routes?.urlDeny]);
      } else if (result.isDismissed && routes?.urlCancel) {
        this.router.navigate([routes?.urlCancel]);
      } else {
        this.swalCustom.close()
      }
    });
  }
}
