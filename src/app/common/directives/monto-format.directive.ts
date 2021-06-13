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
    let montoInverso = monto.split('').reverse();
    
    let resultado = [];
    let aux = '';
    let montoFinal;

    var multiploTres = Math.ceil(montoInverso.length / 3);    

    for(let i = 0; i < multiploTres; i++) {
        for(let j = 0; j < 3; j++) {
            if(montoInverso[j + (i*3)] != undefined) {
                aux += montoInverso[j + (i*3)];
            }
        }
        resultado.push(aux);
        aux = '';
       
        montoFinal = resultado.join('.').split("").reverse().join('');
    }

    this.formControlName.control.setValue(montoFinal);
  }

}
