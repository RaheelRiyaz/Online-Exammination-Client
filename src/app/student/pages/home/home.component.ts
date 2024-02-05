import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificactionResponse } from '../../../models/notifications';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private service: BaseService) {}
  notifications: NotificactionResponse[] = [];
  index: number = 0;
  ngOnInit(): void {
    this.getAllNotifications();
    this.changeNotification();
  }

  getAllNotifications(): void {
    this.service.Fetch<NotificactionResponse[]>('notifications').subscribe({
      next: (response) => {
        this.notifications = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  changeNotification(): void {
    setInterval(() => {
      this.index++;
      this.index === this.notifications.length - 1
        ? (this.index = 0)
        : this.index;
    }, 60000);
  }
}
