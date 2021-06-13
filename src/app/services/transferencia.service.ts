import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient) { }

  obtenerTransferencia(id_usuario: string): Observable<any> {
    return this.httpClient.get(this.API_URL + '/transferencia/obtener/' + id_usuario);
  }

  transferir(data: any): Observable<any> {
    return this.httpClient.post(this.API_URL + '/transferencia/transferir', data);
  }
}
