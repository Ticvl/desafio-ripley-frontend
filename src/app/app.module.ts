import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearDestinatarioComponent } from './pages/crear-destinatario/crear-destinatario.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferenciaDestinatarioComponent } from './pages/transferencia-destinatario/transferencia-destinatario.component';
import { HistoricoTransferenciaComponent } from './pages/historico-transferencia/historico-transferencia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './common/components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { RutFormatPipe } from './common/pipes/rut-format.pipe';
import { MontoFormatPipe } from './common/pipes/monto-format.pipe';
import { RutFormatDirective } from './common/directives/rut-format.directive';
import { FiltroBusquedaDestinatarioPipe } from './common/pipes/filtro-busqueda-destinatario.pipe';
import { MontoFormatDirective } from './common/directives/monto-format.directive';
import { LoginComponent } from './pages/login/login.component';
import { InterceptorService } from './interceptors/interceptor.service';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearDestinatarioComponent,
    TransferenciaDestinatarioComponent,
    HistoricoTransferenciaComponent,
    MenuComponent,
    RutFormatPipe,
    MontoFormatPipe,
    RutFormatDirective,
    FiltroBusquedaDestinatarioPipe,
    MontoFormatDirective,
    LoginComponent,
    RegistrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
