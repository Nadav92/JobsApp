import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/models/member';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  constructor(
    private membersService: MembersService,
    private toastr : ToastrService,
    public presence: PresenceService
  ) { }

  @Input() memberCard!: Member;
  @Output() onChange = new EventEmitter<void>();


  ngOnInit() {
  }
  
  toggleLike(member: Member){
    this.membersService.toggleLikes(member.username).subscribe((liked) => {
      liked? 
      this.toastr.success(`You have Like ` + member.knownAs ) :
      this.toastr.error(`You have Dislike ` + member.knownAs )
      this.onChange.next();
    })
  }

}
