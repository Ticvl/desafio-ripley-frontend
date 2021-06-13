import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destinatario } from '../domain/destinatario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  API_URL: string = environment.API_URL;

  constructor(private readonly httpClient: HttpClient) { }

  obtenerListadoBancos(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/banco/listado-bancos');    
  }

  guardarDestinatario(destinatario: Destinatario): Observable<any> {
    return this.httpClient.post(this.API_URL + '/destinatario/guardar', destinatario);
  }

  obtenerDestinatarios(id_usuario: string): Observable<any> {
    return this.httpClient.get(this.API_URL + '/destinatario/listado/' + id_usuario);
  }

}
