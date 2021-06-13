import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { rutValidator } from 'src/app/common/validators/rut-format.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit, OnDestroy {

  rut: string = "";
  formularioRegistro: FormGroup;
  formularioEnviado: boolean = false;
  tieneCuenta: boolean = false;
  errorGeneral: boolean = false;
  registrado: boolean = false;

  private readonly subs = new Subscription();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioRegistro = this.formBuilder.group({
      rut: ["", [Validators.required, rutValidator]],
      correo: ["", [Validators.required, Validators.pattern('^(?![.])(?!.*[-_.]$)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });
  }

  get form() {
    return this.formularioRegistro.controls;
  }

  registrar() {
    console.log('loggin');
    let usuario = this.formularioRegistro.value;
    this.formularioEnviado = true;
    if(this.formularioRegistro.invalid){
      return;
    }
    const login = this.authService.registrarUsuario(usuario).subscribe(
      (result) => {
        this.registrado = true;
      }, (error) => {
        if(error.status === 409) {
          this.tieneCuenta = true;
        } 
        if(error.status === 500) {
          this.errorGeneral = true;
        }
      });
    
    this.subs.add(login);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
