import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[rutFormatDirective]'
})
export class RutFormatDirective {

  constructor(private el: ElementRef, private formControlName: FormControlName) { }

  @HostListener('input')
  rutMask($event) { 
    let element = event.currentTarget as HTMLInputElement;
    let inputRut = element.value.replace(".", "").replace("-", "");
    let rutFormat = "";
    let dv = "";
    let rut = "";    
    dv = inputRut.slice(-1).toUpperCase();
    rut = inputRut.slice(0, -1).replace(".", "").replace("-","");
 
    if(inputRut.length > 1){      
      rutFormat = rut + '-' + dv;
      if(rut.length > 3 && rut.length <=6){    
        rutFormat = rut.slice(0, -3) + '.' + rut.slice(-3) + '-' + dv;
      }
      if(rut.length > 6){        
        rutFormat = rut.slice(0, -6) + '.' + rut.slice(-6, -3) + '.' + rut.slice(-3) + '-' + dv;
      }    
      this.formControlName.control.setValue(rutFormat);  
    }
    else{
      this.formControlName.control.setValue(inputRut);
    } 

  }

}
