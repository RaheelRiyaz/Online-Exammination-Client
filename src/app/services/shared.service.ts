import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/loginCredentials';
import { environment } from '../Environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private route: Router) {}

  getSessionObject(): LoginCredentials {
    return sessionStorage['online-exammination-token']
      ? JSON.parse(sessionStorage['online-exammination-token'])
      : null;
  }

  logout(): void {
    environment
      .fireConfirmSwal('Are you sure you want to logout?')
      .then((res) => {
        if (res.isConfirmed) {
          sessionStorage.removeItem('online-exammination-token');
          this.route.navigate(['/login']);
        }
      });
  }


}
