import { UserParams } from 'src/app/models/userParams';
import { AccountService } from './account.service';
import { PaginatedResult } from './../models/pagination';
import { Member } from 'src/app/models/member';
import { map, Observable, of, take, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { getPaginatedResult, getPaginationParams } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map<string, PaginatedResult<Member[]>>();
  user: User;
  userParams: UserParams;

  constructor(private http: HttpClient, private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe((user: any) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }


  public get UserParams(): UserParams {
    return this.userParams
  }

  public set UserParams(userParams: UserParams) {
    this.userParams = userParams;
  }


  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {

    const cacheKey = Object.values(userParams).join('-');
    const response = this.memberCache.get(cacheKey);
    if (response) return of(response);

    let params = getPaginationParams(userParams.pageNumber, userParams.pageSize);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('employerOrEmployee', userParams.employerOrEmployee);
    params = params.append('profession', userParams.profession);
    params = params.append('orderBy', userParams.orderBy);

    return getPaginatedResult<Member[]>(`${this.baseUrl}users`, params, this.http)
      .pipe(
        tap(res => this.memberCache.set(cacheKey, res))
      );
  }

  getMember(username: string): Observable<Member> {
    const members = [...this.memberCache.values()];
    const allMembers = members.reduce((arr: Member[], elem: PaginatedResult<Member[]>) => arr.concat(elem.result), []);
    const foundMember = allMembers.find(m => m.username === username);
    if (foundMember) return of(foundMember);
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      tap(_ => {
        const index = this.members.findIndex(x => x.id == member.id);
        this.members[index] = member;
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(`${this.baseUrl}users/set-main-photo/${photoId}`, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`);
  }

  resetUserParams() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  toggleLikes(username: string) {
    const url = `${this.baseUrl}likes/${username}`;
    return this.http.post(url, {});
  }

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = getPaginationParams(pageNumber, pageSize);
    params = params.append('predicate' , predicate);
    return getPaginatedResult<Partial<Member>[]>(`${this.baseUrl}likes`,params, this.http);
  }

}