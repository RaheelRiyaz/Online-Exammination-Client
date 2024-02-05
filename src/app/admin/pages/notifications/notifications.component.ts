import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import {
  NotificactionResponse,
  NotificationRequest,
} from '../../../models/notifications';
import { environment } from '../../../Environment/environment';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';
import { response } from 'express';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SpinnerComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  constructor(private service: BaseService) {}
  notifications: NotificactionResponse[] = [];
  showSpinner: boolean = true;
  selectedNotifications: string[] = [];

  ngOnInit(): void {
    this.getAllNotifications();
  }

  getAllNotifications(): void {
    this.service.Fetch<NotificactionResponse[]>('notifications').subscribe({
      next: (response) => {
        this.notifications = response.result;
        this.showSpinner = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateNotification(id: string, value: string): void {
    console.log(id);
    console.log(value);
  }

  deleteNotification(id: string): void {
    environment
      .fireConfirmSwal('Are you sure you want to delete this notification?')
      .then((res) => {
        if (res.isConfirmed) {
          console.log(id);
        }
      });
  }

  addNotification(): void {
    environment.fireInputSwal('Notification', 'textarea').then((res) => {
      if (res) {
        this.service
          .Post<NotificationRequest, NotificactionResponse>(
            new NotificationRequest(res),
            'notifications'
          )
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.getAllNotifications();
              } else {
                environment.fireErrorSwal(response.message);
              }
            },
            error: (err: Error) => {
              environment.fireErrorSwal(err.message);
            },
          });
      }
    });
  }

  addToSelectedItems(notification: any): void {
    if (this.selectedNotifications.includes(notification.id)) {
      const index = this.selectedNotifications.indexOf(notification.id);
      this.selectedNotifications.splice(index, 1);
    } else {
      this.selectedNotifications.push(notification.id);
    }
  }

  deleteAllNotifications(): void {
    environment
      .fireConfirmSwal('Are you sure you want to delete these notifications ?')
      .then((res) => {
        if (res.isConfirmed) {
          this.service
            .Post<string[], any>(
              this.selectedNotifications,
              'notifications/delete-notifications'
            )
            .subscribe({
              next: (response) => {
                if (response.isSuccess) {
                  environment.fireSuccessSwal(response.message);
                  this.selectedNotifications = [];
                  this.getAllNotifications();
                  document
                    .querySelectorAll("input[type='checkbox']")
                    .forEach((checkbox) => {
                      (checkbox as HTMLInputElement).checked = false;
                    });
                } else {
                  environment.fireErrorSwal(response.message);
                }
              },
              error: (error: Error) => {
                environment.fireErrorSwal(error.message);
              },
            });
        }
      });
  }

  selectAllNotifications(e: any): void {
    if (e.target.checked) {
      this.notifications.map((_) => {
        this.selectedNotifications.push(_.id);
      });

      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          if (checkbox !== e.target)
            (checkbox as HTMLInputElement).checked = !false;
        });
    } else {
      this.selectedNotifications = [];
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
            (checkbox as HTMLInputElement).checked = false;
        });
    }
  }
}
