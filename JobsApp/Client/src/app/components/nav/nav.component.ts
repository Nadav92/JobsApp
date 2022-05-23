import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/User';
import { AccountService } from '../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent implements OnInit {
   member: Member;
   
  model: any = {};
  currentUser$: Observable<User | null>;
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.currentUser$ = this.accountService.currentUser$;
  }

  ngOnInit() {
  }

  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        this.router.navigateByUrl('/members');
        console.log(response);
      });
  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }
}
