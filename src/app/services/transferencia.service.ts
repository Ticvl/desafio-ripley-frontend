import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  constructor(private httpClient: HttpClient) { }

  obtenerTransferencia(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/transferencia/obtener/60bd81316e9ac5105c20c98');
  }
}
