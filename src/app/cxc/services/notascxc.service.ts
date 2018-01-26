import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { ConfigService } from 'app/_core/services/config.service';



@Injectable()
export class NotascxcService {

  private apiUrl: string;  
  // private apiUrl = environment.apiUrl + '/cxc/notas';
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) 
  {
    this.apiUrl = configService.buildApiUrl('cxc/notas');
  }
  
  get(id: string): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url)
  }

  list(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    return this.http.get<any>(this.apiUrl, {params: params}).shareReplay()
  }

  buscarRmd(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = this.apiUrl + '/buscarRmd';
    return this.http.get<any>(url, {params: params});
  }

  buscarFacturasPendientes(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = this.apiUrl + '/buscarFacturasPendientes';
    return this.http.get<any>(url, {params: params});
  }

  generarNotaDeDevolucion(rmd, cartera) {
    const params = new HttpParams().set('cartera', cartera);
    const url = `${this.apiUrl}/generarConRmd/${rmd.id}`
    return this.http.post(url, {}, { params: params});
  }

  timbrar(nota) {
    const url = `${this.apiUrl}/timbrar/${nota.id}`
    return this.http.post(url, {});
  }
  
  save(nota) {
    nota.cliente = { id: nota.cliente.id}
    return this.http.post(this.apiUrl, nota);
  }

  print(nota) {
    const url = `${this.apiUrl}/print/${nota.id}`;
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  mostrarXml(nota): Observable<any> {
    const endpoint = `cfdis/mostrarXml/${nota.cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type' , 'text/xml');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

  /*
  
  
  recepcionDeMercancia(fecha: Date) {
    const url = `${this.apiUrl}/recepcionDeMercancia/`;
    const params = new HttpParams().set('fecha', fecha.toISOString())
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob',
        params: params
      },
    );
  }
  */

}

