import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { GlobalComponent } from 'src/app/global-component';
import { Parametros } from './parametros';
import { NubeFactura } from '../models/factura';
import { Certificado } from '../models/certificado';
import { EMP } from '../models/emp';
import { bo } from '@fullcalendar/core/internal-common';
import { EmailRequest } from '../models/EmailRequest';
//import { S } from 'node_modules/@fullcalendar/core/internal-common';

interface Event {
  type: string;
  payload?: any;
}

type EventCallback = (payload: any) => void;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class EventService {
  public miObjeto: EMP = {};
  public miObjetoaray: EMP[] = [];
  private handler = new Subject<Event>();
  // searchData$: BehaviorSubject<EMP> = new BehaviorSubject<EMP>(null!);
  constructor(private http: HttpClient, private config: ConfiguracionService) { }
  getObjeto() {
    return this.miObjeto;
  }
  // sendData(term: any) {
  //   this.searchData$.next(term);
  // }
  // getData() {
  //   return this.searchData$.asObservable();
  // }

  getObjetoarray() {
    return this.miObjetoaray;
  }
  modificarObjeto(nuevoObjeto: EMP) {
    this.miObjeto = nuevoObjeto;

  }
  modificarObjetoarray(miObjetoaray: EMP[]) {

    this.miObjetoaray = miObjetoaray;
  }
  /**
   * Broadcast the event
   * @param type type of event
   * @param payload payload
   */
  broadcast(type: string, payload = {}) {
    this.handler.next({ type, payload });
  }

  /**
   * Subscribe to event
   * @param type type of event
   * @param callback call back function
   */
  subscribe(type: string, callback: EventCallback): Subscription {
    return this.handler.pipe(
      filter(event => event.type === type)).pipe(
        map(event => event.payload))
      .subscribe(callback);
  }
  get(url: string): Observable<any> {
    return this.http.get(this.config.apiUrl + url, httpOptions);
  }

  post(url: string, parametros: Parametros[]) {
    var link: string = url + "?" + parametros[0].nombre + "=" + parametros[0].valor
    for (let i = 1; i < 3; i++) {
      link = link + "&" + parametros[i].nombre + "=" + parametros[i].valor
      console.log(link)
    }
    return this.http.post(this.config.apiUrl + link, httpOptions);
  }
  postfactura(url: string, factura: NubeFactura): Observable<any> {
    //console.log(JSON.stringify(factura))
    //https://localhost:7271/api/NubeFactura
    return this.http.post(this.config.apiUrl + url, JSON.stringify(factura), httpOptions);

  }
  subircertificado(file: File, certificado: Certificado) {
    //var blob = new Blob([file], { type: "application/octet-stream" });
    const formData = new FormData();
    formData.append('ruc', certificado.ruc);
    formData.append('idcopmpania', certificado.idcompania.toString());
    formData.append('fecha', certificado.fecha);
    formData.append('clave', certificado.clave);
    formData.append('file', file, file.name);
    return this.http.post<Certificado>(this.config.apiUrl + 'Archivos/UploadCertificado', formData)

  }

  guardarempleado(empleado: EMP, usu: string, pass: string) {
    const valor = JSON.stringify(empleado)
    console.log(valor)
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.config.apiUrl + 'Empleados/Post?usu=' + usu + "&contrasena=" + pass, JSON.stringify(empleado), { headers: header })

  }
  actualizandoempleado(empleado: EMP, usu: string, pass: string) {
    const valor = JSON.stringify(empleado)
    console.log(valor)
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.config.apiUrl + 'Empleados/Put?usu=' + usu + "&contrasena=" + pass, JSON.stringify(empleado), { headers: header })

  }
  enviarmail(request: EmailRequest) {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.config.apiUrl + 'Email/SendEmail', JSON.stringify(request), { headers: header })

  }
  Consultarempleados(usu: string, pass: string, idempresa: number): Observable<any> {
    return this.http.get(this.config.apiUrl + "Empleados/Get?usu=" + usu + "&contrasena=" + pass + "&idempresa=" + idempresa, httpOptions);
  }
  ConsultarGcentrocosto(usu: string, pass: string): Observable<any> {
    const link = this.config.apiUrl + "Empleados/GCENTROCOSTO?usu=" + usu + "&contrasena=" + pass
    return this.http.get(this.config.apiUrl + "Empleados/GCENTROCOSTO?usu=" + usu + "&contrasena=" + pass, httpOptions);
  }
  ConsultarSueldos(usu: string, pass: string, codemp: number): Observable<any> {
    return this.http.get(this.config.apiUrl + "Empleados/Sueldos?usu=" + usu + "&contrasena=" + pass + "&codemp=" + codemp, httpOptions);
  }
  Consultarempresa(usu: string, pass: string): Observable<any> {
    return this.http.get(this.config.apiUrl + "Empleados/EMPRESAS?usu=" + usu + "&contrasena=" + pass, httpOptions);
  }
  Consultardocumento(usu: string, pass: string, idempresa: number, fecha: string, codemp: number): Observable<any> {
    return this.http.get(
      this.config.apiUrl +
      "ImpresionReportes/CrearRolIndividual?usu=" + usu + "&pass=" + pass + "&empresa=" + idempresa + "&fecha=" + fecha + "&codemp=" + codemp, { responseType: 'blob' });
  }

  ConsultarCentros(usu: string, pass: string, idempresa: number): Observable<any> {
    return this.http.get(this.config.apiUrl + "Empleados/Centro?usu=" + usu + "&contrasena=" + pass + "&idempresa=" + idempresa, httpOptions);
  }
  ListaPeriodosLectivos(usu: string, pass: string): Observable<any> {
    return this.http.get(this.config.apiUrl + "VariosReportes/ListaPeriodo?usu=" + usu + "&pass=" + pass, httpOptions);
  }
  SeccionesAcademicas(usu: string, pass: string, idempresa: number, periodo: string): Observable<any> {
    var s = this.config.apiUrl + "VariosReportes/ListaSecciones?usu=" + usu + "&pass=" + pass + "&idempresa=" + idempresa + "&periodo" + periodo
    return this.http.get(this.config.apiUrl + "VariosReportes/ListaSecciones?usu=" + usu + "&pass=" + pass + "&idempresa=" + idempresa + "&periodo=" + periodo, httpOptions);
  }
  OrlasPersonal(usu: string, pass: string, idempresa: number): Observable<any> {
    return this.http.get(this.config.apiUrl + "VariosReportes/Orlas?usu=" + usu + "&pass=" + pass + "&idempresa=" + idempresa, httpOptions);
  }
  CumpleaniosPersonal(usu: string, pass: string, idempresa: number): Observable<any> {
    return this.http.get(this.config.apiUrl + "VariosReportes/Cumpleanios?usu=" + usu + "&pass=" + pass + "&idempresa=" + idempresa, httpOptions);
  }
  ConsultaActasIndividual(usu: string, pass: string, periodo: string, Codigo: number): Observable<any> {
    return this.http.get(this.config.apiUrl + "VariosReportes/ActadeReunion?usu=" + usu + "&pass=" + pass + "&periodo=" + periodo + "&codigo=" + Codigo, httpOptions);
  }
  ConsultaActas(usu: string, pass: string, periodo: string, codemp: number, desde?: Date, hasta?: Date, filtro?: string): Observable<any> {
    let params = new HttpParams();
    if (desde) {
      params = params.set('desde', desde.toISOString());
    }
    if (hasta) {
      params = params.set('hasta', hasta.toISOString());
    }
    if (filtro) {
      params = params.set('vfiltro', filtro);
    }
    params = params
      .set('usu', usu)
      .set('pass', pass)
      .set('periodo', periodo)
      .set('codemp', codemp);
    const url = this.config.apiUrl + "VariosReportes/ConsultarActas";
    var s = this.http.get(url, { params });
    return this.http.get(url, { params });
  }
  NumeroAlumnos(usu: string, pass: string, periodo: string, seccion: { VALOR: string; TEXTO: string }[], paralelo: string, tipoRep: string): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('periodo', periodo)
      .set('paralelo', paralelo)
      .set('tipoRep', tipoRep);

    // Agregar cada valor del array "seccion" como múltiples parámetros 'niveles'
    seccion.forEach(item => {
      params = params.append('niveles', item.VALOR);
    });

    const url = this.config.apiUrl + "VariosReportes/NumAlumnos/api/checklist";

    return this.http.get(url, { params });
  }
  ConsultaCapacitaciones(usu: string, pass: string, empresa: number, desde?: Date, hasta?: Date): Observable<any> {
    let params = new HttpParams();
    if (desde) {
      params = params.set('desde', desde.toISOString());
    }
    if (hasta) {
      params = params.set('hasta', hasta.toISOString());
    }
    params = params
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/ConsultaCapacitaciones";

    return this.http.get(url, { params });
  }
  ListaDatosEMP(usu: string, pass: string, empresa: number): Observable<any> {
    let params = new HttpParams();
    params = params
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/DatosExcel";
    return this.http.get(url, { params });
  }
  JefesArea(usu: string, pass: string, empresa: number): Observable<any> {
    let params = new HttpParams();
    params = params
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/JefasArea";
    return this.http.get(url, { params });
  }
  ListadoPEGsxSeccion(usu: string, pass: string, periodo: string, seccion: { VALOR: string; TEXTO: string }[]): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('periodo', periodo);

    // Agregar cada valor del array "seccion" como múltiples parámetros 'niveles'
    seccion.forEach(item => {
      params = params.append('niveles', item.VALOR);
    });

    const url = this.config.apiUrl + "VariosReportes/ListadoPEGsxSeccion/api/checklist";

    return this.http.get(url, { params });
  }
  ListadoPreceptorasxSeccion(usu: string, pass: string, periodo: string, seccion: { VALOR: string; TEXTO: string }[]): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('periodo', periodo);

    // Agregar cada valor del array "seccion" como múltiples parámetros 'niveles'
    seccion.forEach(item => {
      params = params.append('niveles', item.VALOR);
    });

    const url = this.config.apiUrl + "VariosReportes/ListadoPreceptorasxSeccion/api/checklist";

    return this.http.get(url, { params });
  }
  PEGPreceptoras(usu: string, pass: string, periodo: string, seccion: { VALOR: string; TEXTO: string }[], empresa: number, MostrarPeg: string, MostrarPreceptora: string): Observable<Blob> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('periodo', periodo)
      .set('idEmpresa', empresa)
      .set('mostrarPeg', MostrarPeg)
      .set('mostrarPreceptora', MostrarPreceptora);
    // Agregar cada valor del array "seccion" como múltiples parámetros 'niveles'
    seccion.forEach(item => {
      params = params.append('niveles', item.VALOR);
    });

    const url = this.config.apiUrl + "ImpresionReportes/rptPegPreceptora/checklist";

    return this.http.get(url, { params: params, responseType: 'blob' });
  }
  ComparaRoles(usu: string, pass: string, empresa: number, desde?: Date, hasta?: Date): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    if (desde) {
      params = params.set('desde', desde.toISOString());
    }
    if (hasta) {
      params = params.set('hasta', hasta.toISOString());
    }

    const url = this.config.apiUrl + "VariosReportes/ComparativoRoles";

    return this.http.get(url, { params });
  }
  ComparaMensualRoles(usu: string, pass: string, empresa: number, fecha?: Date): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    if (fecha) {
      params = params.set('fecha', fecha.toISOString());
    }

    const url = this.config.apiUrl + "Rol/ComparativoRolesMensual";

    return this.http.get(url, { params });
  }
  ActualizaDatos(usu: string, pass: string, empresa: number,): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/ListaActualizaDatos";
    return this.http.get(url, { params });
  }
  DocActualizaDatos(usu: string, pass: string, empleado: number): Observable<Blob> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('codigo', empleado)

    const url = this.config.apiUrl + "ImpresionReportes/DocActualizaDatos";

    return this.http.get(url, { params: params, responseType: 'blob' });
  }
  ListaTitulos(usu: string, pass: string, empresa: number,): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/ListaTitulos";
    return this.http.get(url, { params });
  }
  ListaEncargos(usu: string, pass: string, empresa: number,): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/ListaEncargos";
    return this.http.get(url, { params });
  }
  Distributivo(usu: string, pass: string, periodo: string, seccion: { VALOR: string; TEXTO: string }[]): Observable<any> {
    let params = new HttpParams()
      .set('usu', usu)
      .set('pass', pass)
      .set('periodo', periodo);
    // Agregar cada valor del array "seccion" como múltiples parámetros 'niveles'
    seccion.forEach(item => {
      params = params.append('niveles', item.VALOR);
    });

    const url = this.config.apiUrl + "VariosReportes/DistributivoMaestras/api/checklist";

    return this.http.get(url, { params });
  }
  CompararIESS(usu: string, pass: string, empresa: number, data: FormData, Fecha?: Date,) {
    // Agregar Fecha solo si existe
    let f = Fecha ? Fecha.toISOString() : "";
    //this.http.post(this.config.apiUrl+"VariosReportes/CompareData?usu="+usu+"&pass="+pass+"&Fecha="+Fecha , data)
    //const url = this.config.apiUrl + "VariosReportes/CompareData/compare-data";
    return this.http.post(this.config.apiUrl + "VariosReportes/CompareData?usu=" + usu + "&pass=" + pass + "&Fecha=" + f + "&empresa=" + empresa, data);
  }
  Prestamos(usu: string, pass: string, empresa: number, saldo: number, desde?: Date, hasta?: Date): Observable<any> {
    let params = new HttpParams();
    if (desde) {
      params = params.set('desde', desde.toISOString());
    }
    if (hasta) {
      params = params.set('hasta', hasta.toISOString());
    }
    if (saldo >= 0) {
      params = params.set('saldo', saldo);
    }
    params = params
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "VariosReportes/Prestamos";
    var s = this.http.get(url, { params });
    return this.http.get(url, { params });
  }
  ImprimePrestamos(usu: string, pass: string, empresa: number, saldo?: number, desde?: Date, hasta?: Date): Observable<Blob> {
    let params = new HttpParams();
    if (desde) {
      params = params.set('desde', desde.toISOString());
    }
    if (hasta) {
      params = params.set('hasta', hasta.toISOString());
    }
    if (saldo) {
      params = params.set('saldo', saldo);
    }
    params = params
      .set('usu', usu)
      .set('pass', pass)
      .set('empresa', empresa);
    const url = this.config.apiUrl + "ImpresionReportes/Prestamos";

    return this.http.get(url, { params: params, responseType: 'blob' });
  }
  FechaProceso(usu: string, pass: string, empresa: number): Observable<any> {
    const params = new HttpParams()
      .set("usu", usu)
      .set("pass", pass)
      .set("empresa", empresa.toString());

    return this.http.get(this.config.apiUrl + "VariosReportes/FechaProceso", { params });
  }
  HorariosSGE(usu: string, pass: string, empresa: number): Observable<any> {
    const params = new HttpParams()
      .set("usu", usu)
      .set("pass", pass)
      .set("idempresa", empresa.toString());

    return this.http.get(this.config.apiUrl + "HorariosSGE/DatosHorarios", { params });
  }
  ListaxCedulaSinEmpresa(usu: string, pass: string): Observable<any> {
    const params = new HttpParams()
      .set("usu", usu)
      .set("pass", pass)

    return this.http.get(this.config.apiUrl + "VariosReportes/ListaEmpleadosCedulasinEmpresa", { params });
  }
  ListaAntiguedadEmpresa(usu: string, pass: string): Observable<any> {
    const params = new HttpParams()
      .set("usu", usu)
      .set("pass", pass)

    return this.http.get(this.config.apiUrl + "Antiguedad/DatosContratos", { params });
  }
  ActualizarContrato(usuario: string, clave: string, datos: any) {
    const params = new HttpParams()
      .set("usu", usuario)
      .set("pass", clave)
    return this.http.post(this.config.apiUrl + "Antiguedad/Update", datos, { params });
  }
  InsertarContrato(usuario: string, clave: string, datos: any) {
    const params = new HttpParams()
      .set("usu", usuario)
      .set("pass", clave)
    return this.http.post(this.config.apiUrl + "Antiguedad/Insert", datos, { params });
  }
  DeleteContrato(usuario: string, clave: string, idContrato: number) {
    const params = new HttpParams()
      .set("usu", usuario)
      .set("pass", clave)
      .set("idContrato", idContrato)
    return this.http.post(this.config.apiUrl + "Antiguedad/Delete", null, { params });
  }
  AcumulacionDecimos(usu: string, pass: string, idEmpresa: number, fecha: Date): Observable<any> {
    const params = new HttpParams()
      .set("usu", usu)
      .set("pass", pass)
      .set("empresa", idEmpresa)
      .set("fecha", fecha.toISOString())
      console.log(this.config.apiUrl + "Rol/ObtenerDecimos", { params });
    return this.http.get(this.config.apiUrl + "Rol/ObtenerDecimos", { params });
    
  }
}
