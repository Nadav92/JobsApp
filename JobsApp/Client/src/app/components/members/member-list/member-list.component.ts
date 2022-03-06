import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Pagination } from './../../../models/pagination';
import { Member } from './../../../models/member';
import { filter, map, Observable } from 'rxjs';
import { MembersService } from './../../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { PagesModel } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  pageNumber: number = 1;
  pageSize: number = 5;
  selectedProf: string = '';

  public professionArr = ['All', 'Security', 'Catering', 'Hi-Tec', 'Medicine'];

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadMembers();

  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(
      res => {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    )
  }

  pageChanged({ page }: any) {
    this.pageNumber = page;
    this.loadMembers();
  }


  profChanged(event: any) {
    this.selectedProf = event.target.value;
    for (let i = 0; i < this.members.length; i++) {

      if (this.selectedProf == 'All') {
        this.loadMembers();
        break;
      }

      if (this.selectedProf != this.members[i].profession) {
        this.memberService.getMembers(this.pageNumber, this.pagination.totalItems).subscribe(
          res => {
            this.members = res.result.filter(items => items.profession == this.selectedProf);
            this.pagination = res.pagination;
            if (this.members.length == 0) this.toastr.error('Error - No Data, Refresh the page');
          }
        )
      }
    }
    if (this.members.length == 0) {
      this.toastr.error('Error - Load all users')
      this.loadMembers();
    }
  }
}


