import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { SharedService } from '../services/shared.service';
import { UserRole } from '../enums/enums';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class StudentGuard implements CanActivate {
  constructor(private router: Router, private sharedService: SharedService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userCredentials = this.sharedService.getSessionObject();
    if (userCredentials && userCredentials.userRole === UserRole.Student) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
