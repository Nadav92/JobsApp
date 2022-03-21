import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';
import { Component, OnInit , Input} from '@angular/core';
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

  ngOnInit() {
  }

  addLike(member: Member){
    this.membersService.addLikes(member.username).subscribe(() => {
      this.toastr.success(`You Liked: ${member.knownAs}`);
    })
  }

}
