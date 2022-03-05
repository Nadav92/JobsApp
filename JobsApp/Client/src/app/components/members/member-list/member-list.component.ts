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

  // members : Member;

  public professionArr = [
    {
      name: 'All',
    },
    {
      name: 'Security',
    },
    {
      name: 'Catering',
    },
    {
      name: 'Hi-Tec',
    },
    {
      name: 'Medicine',
    }
  ]
  constructor(private memberService: MembersService) { }

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

    // filterByProfession(member:Member){
    //   // filterByProfession(prof:string){

    //   this.members$ = this.members$.pipe(
    //     map(items=> 
    //       items.filter(items => items.profession == member.profession))
    //   ) 
    //   // (change)="filterPro(member)" For Html
    //   // (change)="filterPro('Catering')" For Html
    // }

  }


