import { UserRole } from '../enums/enums';

export class LoginCredentials {
  id!: string;
  name!: string;
  userRole!: UserRole;
  filePath!: string;
}
