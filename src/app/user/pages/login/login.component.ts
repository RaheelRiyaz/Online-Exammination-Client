import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginRequest, LoginResponse } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { BaseService } from '../../../services/base.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../enums/enums';
import { log } from 'console';
import { environment } from '../../../Environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private service: BaseService, private router: Router) {}
  loginrequest: LoginRequest = new LoginRequest();

  login(): void {
    this.service
      .Post<LoginRequest, LoginResponse>(this.loginrequest, 'users/login')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            sessionStorage.setItem(
              'online-exammination-token',
              JSON.stringify(response.result)
            );
            switch (response.result.userRole) {
              case UserRole.Admin:
                this.router.navigate(['/admin']);
                break;
              case UserRole.Student:
                this.router.navigate(['/student']);
                break;
              default:
                this.router.navigate(['']);
                break;
            }
          } else {
            environment.fireErrorSwal(response.message);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
