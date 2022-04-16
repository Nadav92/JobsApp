import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NavComponent } from './components/nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { CoreModule } from './modules/core.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptors';
import { SharedModule } from './modules/shared.module';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { PhotoEditorComponent } from './components/member-edit/photo-editor/photo-editor.component';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { DateInputComponent } from './components/forms/date-input/date-input.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './directives/has-role.directive';
import { UserManagmentComponent } from './components/admin/user-managment/user-managment.component';
import { PhotoManagmentComponent } from './components/admin/photo-managment/photo-managment.component';
import { RolesMoadlComponent } from './modals/roles-moadl/roles-moadl.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [			
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ListsComponent,
    MessagesComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TextInputComponent,
    DateInputComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagmentComponent,
    PhotoManagmentComponent,
    RolesMoadlComponent,
    ConfirmDialogComponent
   ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
