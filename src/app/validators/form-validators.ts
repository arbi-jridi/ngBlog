import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (control.value && !emailRegex.test(control.value)) {
      return { email: true };
    }
    return null;
  }

  static required(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value.trim() === '') {
      return { required: true };
    }
    return null;
  }

  static minLength(length: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < length) {
        return { minLength: { requiredLength: length, actualLength: control.value.length } };
      }
      return null;
    };
  }

  static password(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.length < 6) {
      return { shortPassword: true };
    }
    return null;
  }
}