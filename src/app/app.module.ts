import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearDestinatarioComponent } from './crear-destinatario/crear-destinatario.component';
import { DestinatarioService } from './services/destinatario.service';
import { HttpClientModule } from '@angular/common/http';
import { TransferenciaDestinatarioComponent } from './transferencia-destinatario/transferencia-destinatario.component';
import { HistoricoTransferenciaComponent } from './historico-transferencia/historico-transferencia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './common/menu/menu.component';
import { AlertaComponent } from './common/alerta/alerta.component';
import { CommonModule } from '@angular/common';
import { RutFormatPipe } from './common/pipes/rut-format.pipe';
import { MontoFormatPipe } from './common/pipes/monto-format.pipe';
import { RutFormatDirective } from './common/directives/rut-format.directive';
import { FiltroBusquedaDestinatarioPipe } from './common/pipes/filtro-busqueda-destinatario.pipe';
import { MontoFormatDirective } from './common/directives/monto-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    CrearDestinatarioComponent,
    TransferenciaDestinatarioComponent,
    HistoricoTransferenciaComponent,
    MenuComponent,
    AlertaComponent,
    RutFormatPipe,
    MontoFormatPipe,
    RutFormatDirective,
    FiltroBusquedaDestinatarioPipe,
    MontoFormatDirective
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
  providers: [DestinatarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
