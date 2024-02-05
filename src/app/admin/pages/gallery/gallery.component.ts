import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { GalleryResponse } from '../../../models/gallery';
import { environment } from '../../../Environment/environment';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(private service: BaseService) {}
  images: GalleryResponse[] = [];
  baseImageUrl: string = environment.baseImagePath;
  imageViewerSrc: string = '';
  activeImageIndex: number = NaN;

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(): void {
    this.service.Fetch<GalleryResponse[]>('gallery').subscribe({
      next: (response) => {
        this.images = response.result;
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  showFullImage(index: number) {
    this.activeImageIndex = index;
    this.imageViewerSrc = this.baseImageUrl + this.images[index].filePath;
  }

  showPreviousImage(): void {
    this.activeImageIndex--;
    this.activeImageIndex < 0
      ? (this.activeImageIndex = this.images.length - 1)
      : this.activeImageIndex;
    this.imageViewerSrc =
      this.baseImageUrl + this.images[this.activeImageIndex].filePath;
  }

  showNextImage(): void {
    this.activeImageIndex++;
    this.activeImageIndex > this.images.length - 1
      ? (this.activeImageIndex = 0)
      : this.activeImageIndex;
    this.imageViewerSrc =
      this.baseImageUrl + this.images[this.activeImageIndex].filePath;
  }

  async uploadImages() {
    const { value: files } = await Swal.fire({
      title: 'Select images',
      input: 'file',
      inputAttributes: {
        'aria-label': 'Upload your profile picture',
        multiple: 'multiple',
      },
    });

    if (files) {
      const formData = new FormData();
      for (const file of files) {
        formData.append('files', file);
      }
      this.service
        .Post<FormData, GalleryResponse[]>(formData, 'gallery')
        .subscribe({
          next: (response) => {
            if (response.isSuccess) {
              environment.fireSuccessSwal(response.message);
              this.getAllImages();
            } else {
              environment.fireErrorSwal(response.message);
            }
          },
          error: (error: Error) => {
            environment.fireErrorSwal(error.message);
          },
        });
    }
  }
}
