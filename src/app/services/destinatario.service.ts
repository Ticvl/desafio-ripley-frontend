import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destinatario } from '../domain/destinatario';

@Injectable({
  providedIn: 'root'
})
export class DestinatarioService {

  URL_BANCO: string = "https://bast.dev/api/banks.php";
  SERVER: string = "http://localhost:3000";
  API_URL: string = this.SERVER + '/destinatario';

  constructor(private readonly httpClient: HttpClient) { }

  obtenerListadoBancos(): Observable<any> {
    return this.httpClient.get(this.URL_BANCO);    
  }

  guardarDestinatario(destinatario: Destinatario): Observable<any> {
    return this.httpClient.post(this.API_URL + '/guardar', destinatario);
  }

  obtenerDestinatarios(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/listado/' + '60bd81316e9ac5105c20c988');
  }

}
