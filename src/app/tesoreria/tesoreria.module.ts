import { NgModule, ModuleWithProviders} from '@angular/core';

import { SharedModule } from 'app/_shared/shared.module';
import { TesoreriaRoutingModule } from './tesoreria-routing.module';
import { TesoreriaMainPageComponent } from './tesoreria-main-page/tesoreria-main-page.component';
import { AutorizacionDepositosPageComponent } from './pages/autorizacion-depositos-page/autorizacion-depositos-page.component';
import { SolicitudDeDepositoService } from './services/solicitudDeDepositoService';
import { AutorizacionesShowComponent } from './components/autorizaciones-show/autorizaciones-show.component';
import { SolicitudesAutorizadasComponent } from './pages/solicitudes-autorizadas/solicitudes-autorizadas.component';
import { CobrosComponent } from './pages/cobros/cobros.component';
import { BancosService } from 'app/tesoreria/services/bancos.service';
import { CobrosService } from 'app/tesoreria/services/cobros.service';

@NgModule({
  imports: [
    SharedModule,
    TesoreriaRoutingModule
  ],
  declarations: [TesoreriaMainPageComponent, AutorizacionDepositosPageComponent, AutorizacionesShowComponent, SolicitudesAutorizadasComponent, CobrosComponent],
  entryComponents: []
})
export class TesoreriaModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TesoreriaModule,
      providers: [SolicitudDeDepositoService, BancosService, CobrosService],
    };
  }
}
