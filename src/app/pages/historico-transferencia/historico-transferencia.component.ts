import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TransferenciaService } from '../../services/transferencia.service';

@Component({
  selector: 'app-historico-transferencia',
  templateUrl: './historico-transferencia.component.html',
  styleUrls: ['./historico-transferencia.component.css']
})
export class HistoricoTransferenciaComponent implements OnInit, OnDestroy {

  alerta = { mostrar: false, tipo: 'error', mensaje: 'Este es un mensaje'};
  transferencias: [] = [];
  errorGeneral: boolean = false;

  private readonly subs = new Subscription();

  constructor(private transferenciaService: TransferenciaService, private authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerTransferencias();
  }

  obtenerTransferencias() {
    const { _id } = this.authService.getDecodeToken();
    const result = this.transferenciaService.obtenerTransferencia(_id).subscribe(
      (data) => {
        this.transferencias = data;
      }, ({ error }) => {
        console.log(error.mensaje);
        this.errorGeneral = true;
      }
    );

    this.subs.add(result);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
