import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionService } from './configuracion.service';
import { S } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient, private config: ConfiguracionService) { }
  VerListadoRol(usu: string, pass: string, empresa: number, fecha: Date, ccosto: string, tipo_rol: string): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa)
      .set('fecha', fecha.toISOString())
      .set('ccosto', ccosto)
      .set('tipo_rol', tipo_rol)
    const url = this.config.apiUrl + "Rol/ListadoRolGenerado";

    return this.http.get(url, { params });
  }
  ImprimeRolIndividual(usu: string, pass: string, empresa: number, fecha: Date, empleado: number): Observable<Blob> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa)
      .set('fecha', fecha.toISOString())
      .set('codemp', empleado)

    const url = this.config.apiUrl + "ImpresionReportes/CrearRolIndividual";

    return this.http.get(url, { params: params, responseType: 'blob' });
  }
}
