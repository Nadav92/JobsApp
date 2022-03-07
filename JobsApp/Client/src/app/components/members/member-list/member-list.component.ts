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

  // public professionArr = ['All', 'Security', 'Catering', 'Hi-Tec', 'Medicine'];

  constructor
    (private memberService: MembersService,
      private toastr: ToastrService,
      private accountService: AccountService
    ) {
      accountService.currentUser$.pipe(take(1)).subscribe((user:any) => {
        this.user = user;
        this.userParams = new UserParams(user);
      });
  }

  ngOnInit() {
    this.loadMembers();

  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(
      res => {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    )
  }

  pageChanged({ page }: any) {
    this.userParams.pageNumber = page;
    this.loadMembers();
  }

  resetFilters(){
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }


  // profChanged(event: any) {
  //   this.selectedProf = event.target.value;
  //   for (let i = 0; i < this.members.length; i++) {

  //     if (this.selectedProf == 'All') {
  //       this.loadMembers();
  //       break;
  //     }

  //     if (this.selectedProf != this.members[i].profession) {
  //       this.memberService.getMembers(this.userParams).subscribe(
  //         res => {
  //           this.members = res.result.filter(items => items.profession == this.selectedProf);
  //           this.pagination = res.pagination;
  //           if (this.members.length == 0) this.toastr.error('Error - No Data, Refresh the page');
  //         }
  //       )
  //     }
  //   }
  //   if (this.members.length == 0) {
  //     this.toastr.error('Error - Load all users')
  //     this.loadMembers();
  //   }
  // }
}


