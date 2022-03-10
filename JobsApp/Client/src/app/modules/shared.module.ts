import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import {FileUploadModule} from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';


@NgModule({
  imports: [
    FileUploadModule,
    NgxSpinnerModule,
    NgxGalleryModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    // PaginationModule.forRoot()
    TimeagoModule.forRoot()
  ],
  declarations: [],
  exports:[
    FileUploadModule,
    NgxSpinnerModule,
    NgxGalleryModule,
    ToastrModule,
    BsDropdownModule,
    TabsModule,
    BsDatepickerModule,
    PaginationModule,
    FormsModule,
    ButtonsModule,
    TimeagoModule
  ]
})

export class SharedModule { }
