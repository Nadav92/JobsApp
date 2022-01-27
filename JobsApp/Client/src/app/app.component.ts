import { AccountService } from './services/account.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'The Jobs app';
  users :any;

  constructor(private accoountService: AccountService){
  }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser(){
    const userFromLS:any = localStorage.getItem('user');
    const user = JSON.parse(userFromLS);
    this.accoountService.setCurrentUser(user);
  }
}
