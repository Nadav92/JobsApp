import { PresenceService } from './presence.service';
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

  constructor(private http: HttpClient, private presence: PresenceService) { }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
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
            this.presence.createHubConnection(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.curentUserSource$.next(null);
    this.presence.stopHubConnection();
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setCurrentUser(user);
            this.presence.createHubConnection(user);
          }
          return user;
        })
      )
  }

  getDecodedToken(token: any) {
    // return JSON.parse(atob(token.split('.')[1]))
    const tokenParts = token.split('.');
    const payload = tokenParts[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }


}
