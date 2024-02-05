import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { GalleryResponse } from '../../../models/gallery';
import { response } from 'express';
import { environment } from '../../../Environment/environment';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit {
  constructor(private sevice: BaseService) {}
  images: GalleryResponse[] = [];
  baseImageurl:string=environment.baseImagePath;

  ngOnInit(): void {
    this.sevice.Fetch<GalleryResponse[]>('gallery').subscribe({
      next: (response) => {
        console.log(response);
        this.images = response.result;
      },
      error: (err: Error) => {
        console.log(err.message);
      },
    });
  }
}
