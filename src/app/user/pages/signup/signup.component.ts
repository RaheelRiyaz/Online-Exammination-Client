import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { SignupRequest } from '../../../models/user';
import { error } from 'console';
import { environment } from '../../../Environment/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  constructor(private service: BaseService, private router: Router) {}
  signupRequest: SignupRequest = new SignupRequest();
  isUserNameTaken: boolean = false;
  signup(): void {
    console.log(this.signupRequest);
    this.service
      .Post<SignupRequest, any>(this.signupRequest, 'users')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.router.navigate(['/login']);
          } else {
            environment.fireErrorSwal(response.message);
          }
        },
        error: (error: Error) => {
          environment.fireErrorSwal(error.message);
        },
      });
  }

  checkUserName(userName: string): void {
    this.service.Check(userName).subscribe({
      next: (response) => {
        this.isUserNameTaken = response;
        console.log(response);
      },
      error: (error: Error) => {
        console.log(error.message);
      },
    });
  }
}
