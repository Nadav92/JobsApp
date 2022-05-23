import { ToastrService } from 'ngx-toastr';
import { AdminService } from './services/admin.service';
import { AccountService } from './services/account.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PresenceService } from './services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Jobs app';

  constructor(private accoountService: AccountService, private presence : PresenceService){
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userFromLS:any = localStorage.getItem('user');
    const user = JSON.parse(userFromLS);
    if(user){
      this.accoountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}
