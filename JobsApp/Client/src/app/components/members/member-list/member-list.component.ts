import { User } from 'src/app/models/User';
import { AccountService } from './../../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from './../../../models/pagination';
import { Member } from './../../../models/member';
import { take } from 'rxjs';
import { MembersService } from './../../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { UserParams } from 'src/app/models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  selectedProf: string = '';
  userParams: UserParams;
  user: User;
  employerOrEmployeeList= [
    {
      value: 'Employer',
      display: 'Employer'
    },
    {
      value: 'Employee',
      display: 'Employee'
    },
  ];
  professionList= [
    {
      value: 'Default',
      display: 'Default'
    },
    {
      value: 'Security',
      display: 'Security'
    },
    {
      value: 'Catering',
      display: 'Catering'
    },
    {
      value: 'Hi-Tec',
      display: 'Hi-Tec'
    },
    {
      value: 'Medicine',
      display: 'Medicine'
    }
  ];


  constructor
    (private memberService: MembersService
    ) {
    this.userParams = this.memberService.UserParams;
  }

  ngOnInit() {
    this.loadMembers();

  }

  loadMembers() {
    this.memberService.UserParams = this.userParams;
    this.memberService.getMembers(this.userParams).subscribe(
      res => {
        this.members = res.result;
        this.pagination = res.pagination;
      
      }
    )
  }

  pageChanged({ page }: any) {
    this.userParams.pageNumber = page;
    this.memberService.UserParams = this.userParams;
    this.loadMembers()
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

}


