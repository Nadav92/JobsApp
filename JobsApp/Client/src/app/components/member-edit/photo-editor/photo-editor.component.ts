import { AccountService } from './../../../services/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() member: Member;

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
  baseUrl = environment.apiUrl;
  user : User;
  
  constructor(private accointService: AccountService) { 
    this.accointService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User)
  }

  ngOnInit() {
   this.initializeUploader();
  }

  initializeUploader(){
    const options: FileUploaderOptions = {
      url: `${this.baseUrl}users/add-photo`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    }
    this.uploader = new FileUploader(options);

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
      }
    }
  }

  fileOverBase(e: any){
    this.hasBaseDropZoneOver = e;
  }

}
