import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  private curentUserSource$ = new ReplaySubject<User | null>(1);
  currentUser$ = this.curentUserSource$.asObservable();

  setCurrentUser(user: User){
    this.curentUserSource$.next(user);
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.curentUserSource$.next(user);
          }
        }));
  }

  logout() {
    localStorage.removeItem('user');
    this.curentUserSource$.next(null);
  }

  register(model: any){
    return this.http.post<User>(this.baseUrl + 'account/register', model)
    .pipe(
      map((user: User) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.curentUserSource$.next(user);
        }
         return user;
      })
    )
  }
}
