import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/Message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  messages: Message[];
  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.loadMesages();
  }

  loadMesages() {
    this.messageService.getMessageThread(this.username).subscribe(m => {
      this.messages = m;
    })
  }

}
