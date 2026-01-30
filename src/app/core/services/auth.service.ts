import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import { registro } from 'src/app/extraspages/registrarse/registro.model';
import { CacheService } from './cache.service';
import { ConfiguracionService } from './configuracion.service';

const API_URL = GlobalComponent.API_URL;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;

    public currentUserSubject: BehaviorSubject<User>;
     public texto!: BehaviorSubject<string>;

    constructor(private http: HttpClient,private cacheService: CacheService,private config: ConfiguracionService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        this.texto = new BehaviorSubject<string>("rte");
     }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {        
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(API_URL + 'signup', {
            email,
            first_name,
            password,
          }, httpOptions);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(usuario: string, password: string) {

        return this.http.post(this.config.apiUrl+"Usuarios/Login?username="+usuario+"&password="+password , httpOptions);
    }
    suscribirse(nombre: string, mail: string, ruc: string,idplan:string) {

        return this.http.post(this.config.apiUrl+"Suscripcion?nombre="+nombre+"&mail="+mail +"&ruc="+ruc+"&idplan="+idplan, httpOptions);
    }
    Planes() {

        return this.http.get(this.config.apiUrl+"Suscripcion/Getplanes", httpOptions);
    }
    /**
     * Returns the current user
     */
    public currentUser(): any {
        return getFirebaseBackend()!.getAuthenticatedUser();
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        // return getFirebaseBackend()!.logout();
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null!);

        this.cacheService.cleartodo()
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

}

