import { UserRole } from '../enums/enums';

export class LoginRequest {
  userNameOrRegNo: string = '';
  password: string = '';
}

export class LoginResponse {
  id!: string;
  name!: string;
  userRole!: UserRole;
}

export class SignupRequest {
  email!: string;
  password!: string;
  name!: string;
  userName!: string;
  contactNo!: string;
  gender: number=0;
  registrationNumber!: string;
}
