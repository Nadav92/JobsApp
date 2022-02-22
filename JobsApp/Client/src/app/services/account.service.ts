import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private curentUserSource$ = new ReplaySubject<User | null>(1);
  currentUser$ = this.curentUserSource$.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    this.curentUserSource$.next(user);
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
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
          this.setCurrentUser(user);
        }
         return user;
      })
    )
  }

  
}
