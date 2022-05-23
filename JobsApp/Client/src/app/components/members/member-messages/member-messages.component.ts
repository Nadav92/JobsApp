import { NgForm } from '@angular/forms';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/Message.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  messageContent: string;

  constructor(public messageService: MessageService) { }

  ngOnInit() { }

  sendMessage(form: NgForm) {
    this.messageService.sendMessage(this.username, this.messageContent)
    .then(() => {
      form.reset();
    })
  }
}