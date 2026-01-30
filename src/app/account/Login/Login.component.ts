import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { first } from 'rxjs/operators';
import { ToastService  } from '../../shared/services/toast';
import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { GlobalComponent } from '../../../app/global-component';
import { User } from '../../core/models/auth.models';
import { MenuItem } from '../../layouts/sidebar/menu.model';
import { EventService } from '../../core/services/event.service';
import { CacheService } from '../../core/services/cache.service';
import { LoadingService } from '../../core/services/loading.service';
import { MENU } from '../../layouts/sidebar/menu';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  user!: User
  menu!: MenuItem;
  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: UntypedFormBuilder, private authenticationService: AuthenticationService, private router: Router,
    private loading: LoadingService, private eventService: EventService, private authFackservice: AuthfakeauthenticationService, private route: ActivatedRoute, public toastService: ToastService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      ruc: ['', [Validators.required]],
      password: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.loading.showSpinner2("Solicitando accesos")
    // Login Api
    this.authenticationService.login(this.f['usuario'].value.toUpperCase(), this.f['password'].value).subscribe({
      next: (user2: any) => {
        if (user2.usuarioLogueado?.CODEMP > 0) {
          this.user = new User
          this.user.Codigo = user2.usuarioLogueado.CODEMP
          this.user.ID_EMPRESA = user2.usuarioLogueado.ID_EMPRESA
          this.user.RAZONSOCIAL = user2.usuarioLogueado.RAZONSOCIAL
          this.user.MAIL = user2.usuarioLogueado.MAIL
          this.user.usu_adm = user2.usuarioLogueado.USU_RRHH
          this.user.fecha_proceso=user2.usuarioLogueado.FECHA_PROCESO 
          this.loading.closeSpinner();
          this.user.password = this.f['password'].value
          this.user.Nombre = this.f['usuario'].value
          this.menu = new MenuItem
          this.menu = user2.Menu

          const sortRecursive = (items: any) => {
            items.sort((a: any, b: any) => {
              // prioridad para "MENUITEMS.MENU.TEXT"
              if (a.label === "MENUITEMS.MENU.TEXT") return -1;
              if (b.label === "MENUITEMS.MENU.TEXT") return 1;
              // orden normal alfabético
              return a.label.localeCompare(b.label, "es", { sensitivity: "base" });
            });
            items.forEach((item: any) => {
              if (item.subItems && item.subItems.length > 0) {
                sortRecursive(item.subItems); // recursión para hijos
              }
            });
          };
          sortRecursive(this.menu);
          //this.menu.label=user2.Menu.name
          //this.menu.link=user2.Menu.url
          //this.menu.subItems=user2.Menu.children
          localStorage.setItem('toast', 'true');
          localStorage.setItem(GlobalComponent.CURRENT_USER, JSON.stringify(this.user));
          localStorage.setItem(GlobalComponent.Menu, JSON.stringify(this.menu));
          //  // localStorage.setItem('token', data.token);
          this.router.navigate(['/Home']);
        } else {
          this.loading.closeSpinner();
          this.toastService.show("Usuario o contraseña incorrectos", { classname: 'bg-danger text-white', delay: 15000 });
        }

      },
      error: (error: HttpErrorResponse) => {
        this.loading.closeSpinner();
        this.toastService.show(error.toString(), { classname: 'bg-danger text-white', delay: 15000 });
      }
    });



    // if(data != null){
    //   localStorage.setItem('toast', 'true');
    //   localStorage.setItem('currentUser', JSON.stringify(data));
    //  // localStorage.setItem('token', data.token);
    //   this.router.navigate(['/']);
    // } else {
    //   this.toastService.show("Usuario o contraseña incorrectos", { classname: 'bg-danger text-white', delay: 15000 });
    // }
    //  });

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
