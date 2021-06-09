import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rutFormatPipe'
})
export class RutFormatPipe implements PipeTransform {

    transform(value: any): string { 
      if(value.toString().length < 9){
        const tmp = this.dgv(value);
        value = value.toString() + tmp.toString();
      }
      return this.rutFormat(value);
    }

    rutClean(value: string) {
        return value.toString().replace(/[^0-9kK]+/g, '').toUpperCase();
      }

    rutFormat(value): string{
        const rut: string = this.rutClean(value);

        if (rut.length <= 1) {
          return rut;
        }
      
        let result: string = `${rut.slice(-4, -1)}-${rut.substr(rut.length - 1)}`;
        for (let i: number = 4; i < rut.length; i += 3) {
          result = `${rut.slice(-3 - i, -i)}.${result}`;
        }
      
        return result;
    }

    dgv(T)    //digito verificador
    {       
        var M=0,S=1;
        for(;T;T=Math.floor(T/10))
          S=(S+T%10*(9-M++%6))%11;
          return S?S-1:'k';        
    }

}