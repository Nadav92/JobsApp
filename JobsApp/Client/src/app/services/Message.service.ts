import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationParams } from './paginationHelper';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationParams(pageNumber, pageSize);
    params = params.append('container', container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}messages`, params, this.http)
  }

  getMessageThread(username: string){
    return this.http.get<Message[]>(`${this.baseUrl}messages/thread/${username}`);
  }

}


