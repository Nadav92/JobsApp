import { Member } from './../../../models/member';
import { filter, map, Observable } from 'rxjs';
import { MembersService } from './../../../services/members.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members$ :Observable<Member[]>;
  members : Member;

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


  filterByProfession(member:Member){
    // filterByProfession(prof:string){
    
    this.members$ = this.members$.pipe(
      map(items=> 
        items.filter(items => items.profession == member.profession))
    ) 
    // (change)="filterPro(member)" For Html
    // (change)="filterPro('Catering')" For Html
  }

}

