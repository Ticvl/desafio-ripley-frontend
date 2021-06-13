import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  formularioLogin: FormGroup;
  formularioEnviado: boolean = false;
  validarCuenta: boolean = false;
  errorGeneral: boolean = false;

  private readonly subs = new Subscription();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario() {
    this.formularioLogin = this.formBuilder.group({
      correo: ["", [Validators.required, Validators.pattern('^(?![.])(?!.*[-_.]$)[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$')]],
      password: ["", Validators.required]
    });
  }

  get form() {
    return this.formularioLogin.controls;
  }

  login() {
    console.log('loggin');
    let usuario = this.formularioLogin.value;
    this.formularioEnviado = true;
    if(this.formularioLogin.invalid){
      return;
    }
    const login = this.authService.loginUsuario(usuario).subscribe(
      (result) => {
        const { isAuthenticated, token } = result;
        this.authService.setToken(token);
        this.authService.setAuthenticated(isAuthenticated);
        if(isAuthenticated){
          this.router.navigateByUrl('crear-destinatario');
        }
      }, (error) => {
        (error.status === 400) ? this.validarCuenta = true : this.errorGeneral = true;
      });
    
    this.subs.add(login);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
