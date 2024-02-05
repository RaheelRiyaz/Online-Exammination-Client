import { AddProgram } from './programs';

export class SemesterResponse {
  ceatedOn!: Date;
  id!: string;
  sem!: number;
  updatedOn!: Date;
}

export class SemesterRequest {
  constructor(private sem:number){}
}
