import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBusquedaDestinatario'
})
export class FiltroBusquedaDestinatarioPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    for(const post of value) {
      if(post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultado.push(post);
      }
    }
    return resultado;
  }

}
