import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule } from "./layouts/layouts.module";
import { PagesModule } from "./pages/pages.module";

// Auth
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';
import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

// Language
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DxAutocompleteModule, DxButtonModule, DxDataGridModule, DxDateRangeBoxModule, DxListModule, DxNumberBoxModule, DxPivotGridFieldChooserModule, DxPivotGridModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxToolbarModule } from 'devextreme-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ConfiguracionService } from './core/services/configuracion.service';
import { CurrencyInputDirective } from './pages/Mantenimientos/infoempleado/currency-input.directive';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function initApp(configService: ConfiguracionService) {
  return () => configService.getConfig(); // <- Angular espera esta promesa
}


if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  FakeBackendInterceptor;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    HttpClientModule, NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule, CommonModule,
    LayoutsModule,
    PagesModule,
    DxButtonModule,
    DxRadioGroupModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxListModule,
    DxDateRangeBoxModule, DxPivotGridModule,
    DxPivotGridFieldChooserModule, DxToolbarModule,
    DxScrollViewModule,DxAutocompleteModule ,
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initApp,
    deps: [ConfiguracionService],
    multi: true, // importante: permite múltiples inicializadores
  },

  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
