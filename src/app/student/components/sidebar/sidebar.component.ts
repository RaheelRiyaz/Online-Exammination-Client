import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { LoginCredentials } from '../../../models/loginCredentials';
import { environment } from '../../../Environment/environment';
import { ProfilePhotoComponent } from '../../../shared/pages/profile-photo/profile-photo.component';
import Swal from 'sweetalert2';
import { Module } from '../../../enums/enums';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'student-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ProfilePhotoComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    protected service: SharedService,
    private baseServie: BaseService
  ) {}
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
        formData.append('Module', Module.Student.toString());

        this.baseServie
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
