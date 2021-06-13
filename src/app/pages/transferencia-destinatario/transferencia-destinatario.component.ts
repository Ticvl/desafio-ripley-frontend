import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TransferenciaService } from 'src/app/services/transferencia.service';
import { DestinatarioService } from '../../services/destinatario.service';

@Component({
  selector: 'app-transferencia-destinatario',
  templateUrl: './transferencia-destinatario.component.html',
  styleUrls: ['./transferencia-destinatario.component.css']
})
export class TransferenciaDestinatarioComponent implements OnInit, OnDestroy {

  formularioTransferencia: FormGroup;
  formularioEnviado: boolean = false;
  listaDestinatario: [] = [];
  filtrarDestinatario: string;
  mostrarDetalleDestinatario: boolean = false;
  itemSeleccionado: boolean = false;
  destinatario;
  datosValidos: boolean = false;
  transferenciaEstado: boolean = false;
  errorGeneral: boolean = false;

  private readonly subs = new Subscription();

  constructor(private formBuilder: FormBuilder, private destinatarioService: DestinatarioService, private authService: AuthService, private transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerDestinatarios();
  }

  crearFormulario() {
    this.formularioTransferencia = this.formBuilder.group({
      monto: [{value: '', disabled: true},  [Validators.required, Validators.min(1)]]
    });
  }

  get form() {
    return this.formularioTransferencia.controls;
  }

  obtenerDestinatarios() {
    const { _id } = this.authService.getDecodeToken();
    const sub = this.destinatarioService.obtenerDestinatarios(_id).subscribe(
      (result) => {
        this.listaDestinatario = result;
      }, (error) => {
        console.log(error);
      }
    );
    this.subs.add(sub);
  }

  comenzarBusqueda(event: any) {
    this.itemSeleccionado = false;
    this.formularioTransferencia.get('monto').disable();
  }

  seleccionarDestinatario(id) {
    this.filtrarDestinatario = '';
    this.itemSeleccionado = true;
    
    this.destinatario = this.listaDestinatario.find(item => {
      return item['_id'] === id;
    });
    this.formularioTransferencia.get('monto').enable();
  }

  transferir() {
    this.formularioEnviado = true;
    if(this.formularioTransferencia.invalid){
      return;
    }
    if(!this.destinatario) {
      return;
    }

    console.log('destinatario ', this.destinatario);
    let dataTransferencia = this.formularioTransferencia.value;
    const { _id } = this.authService.getDecodeToken();
    dataTransferencia.usuario = _id;
    dataTransferencia.destinatario = this.destinatario._id;
    const transferir = this.transferenciaService.transferir(dataTransferencia).subscribe(
      (result) => {
        console.log(result);
        this.transferenciaEstado = true;
      }, (error) => {
        this.errorGeneral = true;
      });
    this.subs.add(transferir);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  } 

}
