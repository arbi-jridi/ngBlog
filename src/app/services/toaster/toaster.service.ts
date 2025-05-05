import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toaster: ToastrService) {}

  typeSuccess(message: string, tittle: string) {
    this.toaster.success(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }
  typeInfo(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }

  typeWarning(message: string, tittle: string) {
    this.toaster.warning(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }

  typeError(message: string, tittle: string) {
    this.toaster.error(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }
  /* 

  topLeft(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-left',
    });
  }
  topCenter(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-center',
    });
  }

  topRight(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right',
    });
  }
  topFullWidth(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-full-width',
    });
  }

  bottomLeft(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-left',
    });
  }

  bottomCenter(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-center',
    });
  }

  bottomRight(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-right',
    });
  }

  bottomFullWidth(message: string, tittle: string) {
    this.toaster.info(message, tittle, {
      timeOut: 3500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-bottom-full-width',
    });
  }

  notification(message: string, tittle: string) {
    this.toaster.success(message, tittle, {
      timeOut: 3500,
    });
  }

  closeButton(message: string, tittle: string) {
    this.toaster.success(message, tittle, {
      closeButton: true,
      positionClass: 'toast-top-right',
      timeOut: 5000,
    });
  }
*/
  progressBar(message: string, tittle: string) {
    this.toaster.success(message, tittle, {
      closeButton: true,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 5000,
    });
  } 

  mailError(message: string, tittle: string) {
    this.toaster.error(message, tittle, {
      closeButton: true,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 5000,
    });
  } 

  clearToast(message: string, tittle: string) {
    this.toaster.warning(message, tittle, {
      closeButton: true,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'increasing',
      timeOut: 3000,
    });
  }
/* 
  showRemove(message: string, tittle: string) {
    this.toaster.warning(message, tittle, {
      disableTimeOut: true,
      timeOut: 5000,
      positionClass: 'toast-top-right',
    });
  }

  removeAllToast() {
    this.toaster.clear();
  }

  fastDuration(message: string, tittle: string, duration: number) {
    this.toaster.info(message, tittle, {
      timeOut: duration,
      positionClass: 'toast-top-right',
    });
  }

  slowDuration(message: string, tittle: string, duration: number) {
    this.toaster.warning(message, tittle, {
      timeOut: duration,
      positionClass: 'toast-top-right',
    });
  }

  timeouts(message: string, tittle: string, durationTimeOut: number) {
    this.toaster.error(message, tittle, {
      timeOut: durationTimeOut,
      positionClass: 'toast-top-right',
    });
  }

  stickys(message: string, tittle: string, duration: number) {
    this.toaster.success(message, tittle, {
      disableTimeOut: true,
      timeOut: duration,
      positionClass: 'toast-top-right',
    });
  } */
}
