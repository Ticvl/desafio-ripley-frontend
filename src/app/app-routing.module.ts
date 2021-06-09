import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearDestinatarioComponent } from './crear-destinatario/crear-destinatario.component';
import { HistoricoTransferenciaComponent } from './historico-transferencia/historico-transferencia.component';
import { TransferenciaDestinatarioComponent } from './transferencia-destinatario/transferencia-destinatario.component';

const routes: Routes = [
  { path: '', component: CrearDestinatarioComponent },
  { path: 'historico-transferencia', component: HistoricoTransferenciaComponent },
  { path: 'transferencia', component: TransferenciaDestinatarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
