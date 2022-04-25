import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/app/models/photo';
import { take } from 'rxjs';

@Component({
  selector: 'app-photo-managment',
  templateUrl: './photo-managment.component.html',
  styleUrls: ['./photo-managment.component.css']
})
export class PhotoManagmentComponent implements OnInit {
  photos: Photo[];

  constructor(private adminService: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getPhotosForApproval()
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe(photos => {
      this.photos = photos;
      if(photos.length){
        this.toastr.show('you have photos to approve, please go to Photo Managment')
      }
    })
  }
  approvePhoto(photoId: number) {
    this.adminService.approvePhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    })
  }
  
  rejectPhoto(photoId: number) {
    this.adminService.rejectPhoto(photoId).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
    })
  }
}
