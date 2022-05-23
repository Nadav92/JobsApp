import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(user => {
        if (user?.roles.includes('Admin') || user?.roles.includes('Moderator')) {
          return true;
        }
        this.toastr.error('you cannot enter this area');
        return false;
      })
    )
  }

}