import { ConfirmService } from './../../services/confirm.service';
import { MessageService } from './../../services/Message.service';
import { Pagination } from './../../models/pagination';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  pagination: Pagination;
  container: string ='Unread';
  pageNumber:number = 1;
  pageSize:number = 5;
  loading: boolean = false;


  constructor(private messageService: MessageService, private confirmService: ConfirmService) { }

  ngOnInit() {
    this.loadMessages();
    
  }

  loadMessages() {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe(x=> {
      this.messages = x.result;
      this.pagination = x.pagination;
      this.loading = false;
    })
  }

  pageChanged(event:any){
    this.pageNumber = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number){
    this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result => {
      if(result){
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1)
        });
      }
    })
  }

}