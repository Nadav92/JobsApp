import { AccountService } from './../../../services/account.service';
import { PresenceService } from './../../../services/presence.service';
import { Message } from './../../../models/message';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { MessageService } from 'src/app/services/Message.service';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent;
  activeTab: TabDirective;
  messages: Message[] = [];
  subscription: Subscription;
  user : User;

  constructor(
    public presence: PresenceService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private accountService:AccountService,
    private router: Router
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User)
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.member = data['member']
    });

    this.galleryImages = this.getImages();
    this.subscription = this.route.queryParams.subscribe((params: Params) => {
      this.selectTab(params['tab'] || 0)
    })

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
  }

 

  getImages(): NgxGalleryImage[] {
    const imgUrls: NgxGalleryImage[] = [];
    for (const photo of this.member.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imgUrls;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0){
      this.messageService.createHubConnection(this.user, this.member.username);
    }else {
      this.messageService.stopHubConnection();
    } 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.messageService.stopHubConnection();
  }

  // loadMesages() {
  //   this.messageService.getMessageThread(this.member.username).subscribe(m => {
  //     this.messages = m;
  //   })
  // }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
