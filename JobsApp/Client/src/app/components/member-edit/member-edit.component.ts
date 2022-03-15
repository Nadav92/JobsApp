import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../services/account.service';
import { MembersService } from './../../services/members.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/User';
import { take } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;
  isEmployeeSwitch = false;

  public professionArr = [
    {
      name: "Security",
    },
    {
      name: "Catering",
    },
    {
      name: "Hi-Tec",
    },
    {
      name: "Medicine",
    }
  ]

  @ViewChild('editGeneral') editGeneral: NgForm
  @ViewChild('editResume') editResume: NgForm

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editGeneral.dirty || this.editResume.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private accountService: AccountService,
    private membersService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user as User
    });

  }

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.user.username).subscribe(member => {
      this.member = member
    });
  }

  updtaeMember() {
    this.membersService.updateMember(this.member).subscribe(() => {
      console.log(this.member);
      this.toastr.success("Profile updated successfully");
      this.editGeneral.reset(this.member);
      this.editResume.reset(this.member);
    })
  }

  employeeCheckBox() {
    this.isEmployeeSwitch = this.isEmployeeSwitch == false ? true : false;
  }

}
