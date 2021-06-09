import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DestinatarioService } from '../services/destinatario.service';

@Component({
  selector: 'app-transferencia-destinatario',
  templateUrl: './transferencia-destinatario.component.html',
  styleUrls: ['./transferencia-destinatario.component.css']
})
export class TransferenciaDestinatarioComponent implements OnInit {

  formularioTransferencia: FormGroup;
  formularioEnviado: boolean = false;
  listaDestinatario: [] = [];
  filtrarDestinatario: string;
  mostrarDetalleDestinatario: boolean = false;
  itemSeleccionado: boolean = false;
  destinatario;
  datosValidos: boolean = false;
  private readonly subs = new Subscription();

  constructor(private formBuilder: FormBuilder, private destinatarioService: DestinatarioService) { }

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
    const sub = this.destinatarioService.obtenerDestinatarios().subscribe(
      (result) => {
        console.log(result);
        this.listaDestinatario = result;
      }, (error) => {

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
    console.log(this.formularioTransferencia.value);
    this.formularioEnviado = true;
    if(this.formularioTransferencia.invalid){
      return;
    }
    console.log(this.formularioTransferencia.value);
  }

}
