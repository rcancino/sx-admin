import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import { ConfigService } from 'app/_core/services/config.service';
import { Cobro } from 'app/_shared/models/cobro';



@Injectable()
export class CobrosService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.apiUrl = config.buildApiUrl('cxc/cobro');
   }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url);
  }

  list(filtro: {} = {}): Observable<Cobro[]> {
    let params = new HttpParams()
      .set('pendientes', 'pendientes')
      .set('sucursal', this.config.getCurrentSucursal().id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<Cobro[]>(this.apiUrl, {params: params})
  }

  cobrosMonetariosEnCredito(filtro: {} = {}) {
    let params = new HttpParams()
      .set('sucursal', this.config.getCurrentSucursal().id);
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/cobrosMonetariosEnCredito`;
    return this.http.get<Cobro[]>(url, {params: params});
  }


  save(com: Cobro) {
    return this.http.post(this.apiUrl, com);
  }

  update(com: Cobro) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}

