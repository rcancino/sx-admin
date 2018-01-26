import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotascxcService } from 'app/cxc/services/notascxc.service';
import { TdLoadingService } from '@covalent/core/loading/services/loading.service';
import { TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-nota-view',
  templateUrl: './nota-view.component.html',
  styles: []
})
export class NotaViewComponent implements OnInit {

  nota: any

  constructor(
    private route: ActivatedRoute,
    private service: NotascxcService,
    private loadingService: TdLoadingService,
    private dialogService: TdDialogService
  ) { }

  ngOnInit() {
    this.route.paramMap
    .switchMap(params => {
      console.log('Params: ', params);
      return this.service.get(params.get('id'))
    })
    .subscribe(nota => this.nota = nota);
  }

  print(nota) {
    // this.loadingService.register('procesando');
    this.service.print(nota)
      .delay(1000)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'application/pdf'
        });
        // this.loadingService.resolve('saving');
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      }, error2 => console.log(error2));
  }

  timbrar(nota) {
    console.log('Timbrando: ', nota);
    this.loadingService.register('procesando');
    if(!nota.cfdi) {
      this.service.timbrar(nota)
      .catch( error2 => this.handelError2(error2))
      .finally( () => this.loadingService.resolve('procesando'))
      .subscribe(res => {
        console.log('Nota timbrada: ', res)
      });
    }
  }

  mostrarXml(nota) {
    this.service.mostrarXml(nota)
      .subscribe(res => {
        const blob = new Blob([res], {
          type: 'text/xml'
        });
        const fileURL = window.URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      });
  }

  handelError2(response) {
    const message = response.error ? response.error.message : 'Error en servidor'
    const ref = this.dialogService.openAlert({
      title: `Error ${response.status}`,
      message: message,
      closeButton: 'Cerrar'
    });
    return Observable.empty();
  }


}
