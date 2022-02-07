import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from '../components/members/member-detail/member-detail.component';
import { MemberListComponent } from '../components/members/member-list/member-list.component';
import { MemberCardComponent } from '../components/members/member-card/member-card.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';

const routes: Routes = [
  {path: '',component: MemberListComponent, pathMatch:'full'},
  {path: ':username', component: MemberDetailComponent},
]

@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberListComponent,
    MemberCardComponent
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
    MemberCardComponent
  ]
})
export class MembersModule { }
