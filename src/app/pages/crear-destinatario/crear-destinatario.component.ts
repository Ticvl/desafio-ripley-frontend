import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { rutValidator } from '../../common/validators/rut-format.validator';
import { AuthService } from '../../services/auth.service';
import { DestinatarioService } from '../../services/destinatario.service';

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
  errorGeneral: boolean = false;
  destinatarioCreado: boolean = false;

  private readonly subs = new Subscription();

  constructor(private formBuilder: FormBuilder, private destinatarioService: DestinatarioService, private authService: AuthService) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.obtenerListadoBancos();    
  }

  crearFormulario() {
    this.formularioDestinatario = this.formBuilder.group({
      nombre: ["", Validators.required],
      rut: ["", [Validators.required, rutValidator]],
      correo: ["", [Validators.required, Validators.pattern('^(?![.])(?!.*[-_.]$)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')]],
      numeroTelefono: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
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
      (result) => {
        this.listadoBancos = result;
      }, ( error ) => {
        this.errorGeneral = true;
      }
    );
    this.subs.add(sub);
  }

  guardarDestinatario() {
    console.log('Guardando');
    this.formularioEnviado = true;
    if(this.formularioDestinatario.invalid){
      return;
    }
    let destinatario = this.formularioDestinatario.value;
    const idDestinatario = this.authService.getDecodeToken();
    destinatario.usuario = idDestinatario._id;
    const guardar = this.destinatarioService.guardarDestinatario(destinatario)
      .subscribe((result) => {
        this.destinatarioCreado = true;
      },
      (error) => {
        this.errorGeneral = true;
      });
    
    this.subs.add(guardar);
   
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
