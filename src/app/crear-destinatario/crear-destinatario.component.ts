import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { rutValidator } from '../common/validators/rut-format.validator';
import { DestinatarioService } from '../services/destinatario.service';

@Component({
  selector: 'app-crear-destinatario',
  templateUrl: './crear-destinatario.component.html',
  styleUrls: ['./crear-destinatario.component.css']
})
export class CrearDestinatarioComponent implements OnInit, OnDestroy {

  rut: string = "";
  formularioDestinatario: FormGroup;
  formularioEnviado: Boolean = false;
  listadoBancos: Array<string>;
  tipoCuenta: Array<string> = ["Cuenta Vista", "Cuenta Corriente"];
  alerta = { mostrar: false, tipo: '', mensaje: ''};

  private readonly subs = new Subscription();

  constructor(private formBuilder: FormBuilder, public destinatarioService: DestinatarioService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerListadoBancos();    
  }

  crearFormulario() {
    this.formularioDestinatario = this.formBuilder.group({
      nombre: ["", Validators.required],
      rut: ["", [Validators.required, rutValidator]],
      correo: ["", [Validators.required, Validators.email]],
      numeroTelefono: ["", Validators.required],
      bancoDestino: ["", Validators.required],
      tipoCuenta: ["", Validators.required],
      numeroCuenta: ["", Validators.required]
    });
  }

  get form() {
    return this.formularioDestinatario.controls;
  }

  obtenerListadoBancos() {
    const sub = this.destinatarioService.obtenerListadoBancos().subscribe(
      ( { banks } ) => {
        this.listadoBancos = banks;
      }, ( error ) => {
        console.log('Existe un error', error);
      }
    );
    this.subs.add(sub);
  }

  guardarDestinatario() {
    console.log('Guardando');
    this.formularioEnviado = true;
    if(this.formularioDestinatario.invalid){
      alert('Invalido');
      return;
    }
    console.log(JSON.stringify(this.formularioDestinatario.value));

    const guardar = this.destinatarioService.guardarDestinatario(this.formularioDestinatario.value)
    .subscribe((result) => {
      console.log(result);
    },
    (error) => {
      console.log('error');
    });
   
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
