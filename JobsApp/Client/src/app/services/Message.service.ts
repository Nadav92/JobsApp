import { Group } from './../models/group';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { getPaginatedResult, getPaginationParams } from './paginationHelper';
import { Message } from '../models/message';
import { Observable, BehaviorSubject, take } from 'rxjs';
import { User } from '../models/User';
import { group } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) { }

  createHubConnection(user:User, otherUsername:string){
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(`${this.hubUrl}message?user=${otherUsername}`, {accessTokenFactory: () => user.token})
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start().catch(err => console.log(err));

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this.messageThreadSource.next(messages);
    })

    this.hubConnection.on('NewMessage', message =>{
      this.messageThread$.pipe(take(1)).subscribe(messages => {
        this.messageThreadSource.next([...messages, message])
      })
    })

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if(group.connections.some(x => x.username === otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe(messages => {
          messages.forEach(message => {
            if(!message.dateRead){
              message.dateRead= new Date(Date.now())
            }
          })
          this.messageThreadSource.next([...messages]);
        })
      }
    })
  }

  stopHubConnection(){
    if(this.hubConnection){
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = getPaginationParams(pageNumber, pageSize);
    params = params.append('container', container);
    return getPaginatedResult<Message[]>(`${this.baseUrl}messages`, params, this.http)
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(`${this.baseUrl}messages/thread/${username}`);
  }

  async sendMessage(username: string, content: string) {
    const createMessgae = { recipientUsername: username, content: content }
    return this.hubConnection.invoke('SendMessage', createMessgae)
    .catch(err => console.log(err));
  }

  deleteMessage(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}messages/${id}`);
  }

}


