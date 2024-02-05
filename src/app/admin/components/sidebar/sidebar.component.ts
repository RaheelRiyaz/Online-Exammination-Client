import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { LoginCredentials } from '../../../models/loginCredentials';
import { ProfilePhotoComponent } from '../../../shared/pages/profile-photo/profile-photo.component';
import { environment } from '../../../Environment/environment';
import { Module } from '../../../enums/enums';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfilePhotoComponent,HttpClientModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  module: Module = Module.Admin;
  constructor(public service: SharedService,private baseService:BaseService) {}
  userInfo: LoginCredentials = new LoginCredentials();
  extensions: string[] = ['image/jpg', 'image/jpeg', 'image/png'];
  baseImagePath: string = environment.baseImagePath;
  ngOnInit(): void {
    this.userInfo = this.service.getSessionObject();
  }

  async uploadProfilePicture() {
    const { value: file } = await Swal.fire({
      title: 'Select image',
      input: 'file',
      inputAttributes: {
        'aria-label': 'Upload your profile picture',
      },
    });
    if (file) {
      if (this.extensions.includes(file.type)) {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('EntityId', this.userInfo.id);
        formData.append('Module', Module.Admin.toString());

        this.baseService
          .Post<FormData, any>(formData, 'students/upload-profile')
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.userInfo.filePath = response.result.filePath;
                sessionStorage.setItem(
                  'online-exammination-token',
                  JSON.stringify(this.userInfo)
                );
              } else {
                environment.fireErrorSwal(response.message);
              }
            },
            error: (err: Error) => {
              console.log(err);
              environment.fireErrorSwal(err.message);
            },
          });
      } else {
        environment.fireErrorSwal('File Format not accepted');
      }
    }
  }
}
