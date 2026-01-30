import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionService } from './configuracion.service';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  constructor(private http: HttpClient, private config: ConfiguracionService) { }
  CargasFamiliaresSelect(usu: string, pass: string, empresa: number, anio: Date): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('idempresa', empresa)
      .set('anio', anio.getFullYear())
    const url = this.config.apiUrl + "CargasFamiliares/ConsultaDatos";
    return this.http.get(url, { params });
  }
}
