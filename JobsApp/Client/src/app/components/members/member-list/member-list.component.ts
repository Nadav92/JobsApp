import { Observable } from 'rxjs';
import { MembersService } from './../../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$ :Observable<Member[]>;
  members : Member[] = [];
  filetrMember: Member | any

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
    this.members$ = this.memberService.getMembers();
  }

}

