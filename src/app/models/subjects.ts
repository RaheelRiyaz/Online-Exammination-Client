export class SubjectResponse {
  name!: string;
  id!: string;
  ceatedOn!: Date;
  updatedOn!: Date;
}

export class AddSubject {
  constructor(private name: string) {}
}
