import { MembersService } from './../../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members :Member[] = [];
  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMembers()
    .subscribe(members => {
      this.members = members;
    })
  }

}
