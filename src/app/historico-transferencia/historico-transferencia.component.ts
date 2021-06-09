import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransferenciaService } from '../services/transferencia.service';

@Component({
  selector: 'app-historico-transferencia',
  templateUrl: './historico-transferencia.component.html',
  styleUrls: ['./historico-transferencia.component.css']
})
export class HistoricoTransferenciaComponent implements OnInit, OnDestroy {

  alerta = { mostrar: false, tipo: 'error', mensaje: 'Este es un mensaje'};
  transferencias: [] = [];
  private readonly subs = new Subscription();

  constructor(private readonly transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    this.obtenerTransferencias();
  }

  obtenerTransferencias() {
    const result = this.transferenciaService.obtenerTransferencia().subscribe(
      (data) => {
        this.transferencias = data;
      }, ({ error }) => {
        console.log(error.mensaje);
        this.alerta.mostrar = true;
      }
    );

    this.subs.add(result);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
