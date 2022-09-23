import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

interface IPat {
  [key: string]: RegExp;
}

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  pats: IPat = {
    emailPat: /^([a-z0-9._%+-]+@(((\bgmail\b))|(\boutlook\b)|(\blive\b)|(\byahoo\b)|(\bhotmail\b)|(\btest\b))+(\.[a-z]{2,4}$))/,
    passwordPat: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,12}$/,
    namePat:
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,12}$/,
    minMaxPat: /^.{2,4}$/,
    phone: /^[0-9]{9,15}$/,
    // phoneInt: RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
    // ltcPat: /^{2,15}$/,
  };
  //

  passwordMismatch(camp1: string, camp2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const one = formGroup.get(camp1)?.value;
      const two = formGroup.get(camp2)?.value;

      if (one != two) {
        formGroup.get(camp2)?.setErrors({ mismatch: true });
        return {
          mismatch: true,
        };
      }
      formGroup.get(camp2)?.setErrors(null);
      return null;
    };
  }

  validatePat(type: string) {
    return (formControl: AbstractControl): ValidationErrors | null => {
      const value = formControl?.value;
      const regExp = this.pats[type];
      if (!regExp.test(value)) {
        formControl.setErrors({ [type]: true });
        return {
          [type]: true,
        };
      }
      formControl.setErrors(null);
      return null;
    };
  }
}
