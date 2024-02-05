import { HttpStatusCode } from '@angular/common/http';

export class ApiResponse<T> {
  isSuccess!: boolean;
  message!: string;
  statusCode!: HttpStatusCode;
  result!: T;
}
