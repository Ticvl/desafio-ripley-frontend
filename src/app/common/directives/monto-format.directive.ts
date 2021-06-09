import { Directive, HostListener } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Directive({
  selector: '[montoFormatDirective]'
})
export class MontoFormatDirective {

  constructor(private formControlName: FormControlName) { }

  @HostListener('keyup')
  //@HostListener('onchange')
  separatorMiles($event) {    
    let element = event.currentTarget as HTMLInputElement;
    let monto = element.value.split('.').join('');
    var arrayMonto = monto.split('').reverse();
    var multiplo = Math.ceil(arrayMonto.length/3);
    console.log('3n - ' + multiplo);
    console.log(JSON.stringify(arrayMonto.length));
  }

}
