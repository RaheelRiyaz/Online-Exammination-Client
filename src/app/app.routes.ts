import { Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { StudentGuard } from './auth/student.guard';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', loadChildren: () => UserModule },
  {
    path: 'student',
    loadChildren: () => StudentModule,
    // canActivate: [StudentGuard],
  },
  { path: 'admin', loadChildren: () => AdminModule, canActivate: [AdminGuard] },
];
