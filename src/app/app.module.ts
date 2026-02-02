import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';

import { environment } from '../environments/environment';
import { initFirebaseBackend } from './authUtils';

import { FakeBackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgxSpinnerModule } from 'ngx-spinner';

// DevExtreme
import {
  DxAutocompleteModule,
  DxButtonModule,
  DxDateRangeBoxModule,
  DxListModule,
  DxNumberBoxModule,
  DxPivotGridFieldChooserModule,
  DxPivotGridModule,
  DxRadioGroupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxToolbarModule
} from 'devextreme-angular';

import { ConfiguracionService } from './core/services/configuracion.service';

/* ============================
   FACTORY PARA TRANSLATE
   ============================ */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/* ============================
   APP INITIALIZER
   ============================ */
export function initApp(configService: ConfiguracionService) {
  return () => configService.getConfig();
}

/* ============================
   FIREBASE / FAKE BACKEND
   ============================ */
if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRoutingModule,
  NgxSpinnerModule.forRoot()
],
  // imports: [
  //   BrowserModule,
  //   BrowserAnimationsModule,
  //   HttpClientModule,

  //    NgxSpinnerModule.forRoot()

  //   AppRoutingModule,
  //   LayoutsModule,
  //   PagesModule,

  //   /* ========= TRANSLATE ========= */
  //   TranslateModule.forRoot({
  //     defaultLanguage: 'en',
  //     loader: {
  //       provide: TranslateLoader,
  //       useFactory: HttpLoaderFactory,
  //       deps: [HttpClient],
  //     },
  //   }),

  //   /* ========= DEVEXTREME ========= */
  //   DxButtonModule,
  //   DxRadioGroupModule,
  //   DxSelectBoxModule,
  //   DxNumberBoxModule,
  //   DxListModule,
  //   DxDateRangeBoxModule,
  //   DxPivotGridModule,
  //   DxPivotGridFieldChooserModule,
  //   DxToolbarModule,
  //   DxScrollViewModule,
  //   DxAutocompleteModule,
  // ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [ConfiguracionService],
      multi: true,
    },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
