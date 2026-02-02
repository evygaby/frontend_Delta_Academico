import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbToastModule, NgbProgressbarModule,
  NgbNavModule,
  NgbDatepickerModule
} from '@ng-bootstrap/ng-bootstrap';


import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider


import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { AppsModule } from "./apps/apps.module";
import { UsuarioComponent } from './usuario/usuario.component';
import { HomeComponent } from './Home/Home.component';
import { DxBoxModule, DxCardViewModule, DxCheckBoxModule, DxListModule, DxDataGridModule, DxDateBoxModule, DxNumberBoxModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxModule, DxTreeMapModule, DxDateRangeBoxModule, DxPivotGridModule, DxToolbarModule, DxButtonModule, DxPivotGridFieldChooserModule, DxScrollViewModule, DxTabPanelModule, DxFileUploaderModule, DxPopupModule, DxFormModule, DxValidatorModule  } from 'devextreme-angular';
import { NgSelectModule } from '@ng-select/ng-select';

import { LoadingComponent } from './loading/loading.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    UsuarioComponent,
    HomeComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule, DxNumberBoxModule,
    FormsModule, DxCheckBoxModule, DxDateBoxModule, MatNativeDateModule,
    NgbToastModule, DxTextAreaModule,
    NgbProgressbarModule, DropzoneModule, NgbDatepickerModule,
    FlatpickrModule.forRoot(),
    ReactiveFormsModule,
    NgApexchartsModule, NgbNavModule,
    LeafletModule,
    NgbDropdownModule, NgSelectModule, DxBoxModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxTemplateModule,
    SharedModule,
    WidgetModule,
    DxCardViewModule,
    DxTreeMapModule,
    DxListModule,
    LightboxModule,
    AppsModule,
    DxDataGridModule,
    DxDateRangeBoxModule,
    DxPivotGridModule,
    DxFileUploaderModule,
    DxToolbarModule,
    DxButtonModule,
    DxPivotGridFieldChooserModule,
    DxScrollViewModule,
    DxTabPanelModule, DxPopupModule, DxFormModule, DxValidatorModule, DxDateBoxModule, DxTemplateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
