import { AboutComponent } from './components/about/about.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListsComponent } from './components/lists/lists.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AuthGuard } from './guards/auth.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { FooterComponent } from './components/footer/footer.component';
 

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members',
        loadChildren: () => import('./modules/members.module').then(m=> m.MembersModule)
      },
      {path: 'member/edit',component: MemberEditComponent , canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists',component: ListsComponent},
      {path: 'messages',component: MessagesComponent},
      {path: 'admin',component: AdminPanelComponent, canActivate: [AdminGuard]},
      {path: 'footer',component: FooterComponent},
      {path: 'about',component: AboutComponent},
    ]
  },
  {
    path:'errors', component: TestErrorsComponent
  },
  {path:'not-found' , component: NotFoundComponent},
  {path:'server-error' , component: ServerErrorComponent},
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
