import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  constructor(
    private membersService: MembersService,
    private toastr : ToastrService
  ) { }

  @Input() memberCard!: Member;
  @Output() onChange = new EventEmitter<void>();

  isLike =  false;
  ngOnInit() {
  }
  
  toggleLike(member: Member){
    this.membersService.toggleLikes(member.username).subscribe((liked) => {
      this.toastr.success(`You have ` + (liked ? `liked `  : `dislike `) + member.knownAs);
      this.isLike = liked ? true : false ;
      console.log(this.isLike);
      this.onChange.next();
    })
  }

}
