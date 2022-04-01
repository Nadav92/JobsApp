import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberDetailComponent } from '../components/members/member-detail/member-detail.component';
import { MemberListComponent } from '../components/members/member-list/member-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared.module';
import { MemberMessagesComponent } from '../components/members/member-messages/member-messages.component';
import { MemberDetailedResolver } from '../resolvers/member-detailed.resolver';

const routes: Routes = [
  {path: '',component: MemberListComponent, pathMatch:'full'},
  {
    path: ':username', 
    component: MemberDetailComponent,
    resolve: {
      member: MemberDetailedResolver
    }
  },
]

@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberListComponent,
    MemberMessagesComponent
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
