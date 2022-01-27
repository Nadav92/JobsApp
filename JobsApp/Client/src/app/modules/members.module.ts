import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from '../components/members/member-detail/member-detail.component';
import { MemberListComponent } from '../components/members/member-list/member-list.component';
import { SharedModule } from './shared.module';

const routes: Routes = [
  {path: '',component: MemberListComponent, pathMatch:'full'},
  {path: ':id', component: MemberDetailComponent},
]

@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[
    RouterModule,
    MemberDetailComponent,
    MemberListComponent,
  ]
})
export class MembersModule { }
