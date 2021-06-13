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
      numeroTelefono: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]+')]],
      bancoDestino: ["", Validators.required],
      tipoCuenta: ["", Validators.required],
      numeroCuenta: ["", [Validators.required, Validators.pattern('^[0-9]+')]]
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
    this.ocultarAlert();
    this.subs.add(sub);
  }

  guardarDestinatario() {
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
    this.resetFormulario();
    this.ocultarAlert();
   
  }

  resetFormulario() {
    this.formularioEnviado = false;
    this.formularioDestinatario.get('rut').setValue('');
    this.formularioDestinatario.get('nombre').setValue('');
    this.formularioDestinatario.get('correo').setValue('');
    this.formularioDestinatario.get('numeroTelefono').setValue('');
    this.formularioDestinatario.get('bancoDestino').setValue('');
    this.formularioDestinatario.get('tipoCuenta').setValue('');
    this.formularioDestinatario.get('numeroCuenta').setValue('');
    this.formularioDestinatario.get('rut').setErrors(null);
    this.formularioDestinatario.get('nombre').setErrors(null);
    this.formularioDestinatario.get('correo').setErrors(null);
    this.formularioDestinatario.get('numeroTelefono').setErrors(null);
    this.formularioDestinatario.get('bancoDestino').setErrors(null);
    this.formularioDestinatario.get('tipoCuenta').setErrors(null);
    this.formularioDestinatario.get('numeroCuenta').setErrors(null);
    
    setTimeout(() => {
      this.destinatarioCreado = false;
    }, 3000);
  }

  ocultarAlert() {
    setTimeout(() => {
      this.errorGeneral = false;
    }, 3000)
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
