import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-notifications.component.html',
  styleUrl: './student-notifications.component.scss'
})
export class StudentNotificationsComponent {
constructor(){
  console.log("notifications");
  
}
}
