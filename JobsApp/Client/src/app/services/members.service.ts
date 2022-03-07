import { PaginatedResult } from './../models/pagination';
import { Member } from 'src/app/models/member';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserParams } from '../models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  constructor(private http: HttpClient) { }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {

    let params = this.getPaginationHeaders(userParams);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('employerOrEmployee', userParams.employerOrEmployee);
    params = params.append('profession', userParams.profession);

    return this.getPaginatedResult<Member[]>(`${this.baseUrl}users`, params)
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find(x => x.username == username);
    if (member) {
      return of(member);
    }
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

  private getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url,
      {
        observe: 'response',
        params
      }).pipe(
        map((res: HttpResponse<T>) => {
          paginatedResult.result = res.body as T;
          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
          }
          return paginatedResult;
        })
      );
  }

  private getPaginationHeaders({ pageNumber, pageSize }: UserParams) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString())
    params = params.append('pageSize', pageSize.toString())
    return params;
  }

}