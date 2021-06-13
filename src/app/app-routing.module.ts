import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearDestinatarioComponent } from './pages/crear-destinatario/crear-destinatario.component';
import { ActivarRutaGuard } from './guards/activar-ruta.guard';
import { HistoricoTransferenciaComponent } from './pages/historico-transferencia/historico-transferencia.component';
import { LoginComponent } from './pages/login/login.component';
import { TransferenciaDestinatarioComponent } from './pages/transferencia-destinatario/transferencia-destinatario.component';
import { RegistrarUsuarioComponent } from './pages/registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'crear-destinatario', component: CrearDestinatarioComponent },
  { path: 'historico-transferencia', component: HistoricoTransferenciaComponent},
  { path: 'transferencia', component: TransferenciaDestinatarioComponent, canActivate: [ActivarRutaGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
