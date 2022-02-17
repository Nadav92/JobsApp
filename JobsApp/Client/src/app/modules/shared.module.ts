import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import {FileUploadModule} from 'ng2-file-upload';


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
    })
  ],
  declarations: [],
  exports:[
    FileUploadModule,
    NgxSpinnerModule,
    NgxGalleryModule,
    ToastrModule,
    BsDropdownModule,
    TabsModule
  ]
})

export class SharedModule { }
