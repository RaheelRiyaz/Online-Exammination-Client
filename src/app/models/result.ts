export class UploadResultRequest {
  constructor(private examId: string) {}
}

export class Checkresult {
  registrationNumber!: string;
  semesterid: string = '';
  programId: string = '';
}

export class StudentResultResponse {
  examDuration!: number;
  examId!: string;
  examPassMarks!: number;
  examTotalMarks!: number;
  marksObtained!: number;
  programId!: string;
  resultId!: string;
  resultStatus!: number;
  resultUploadDate!: string;
  subjectName!: string;
  totalAttempts!: number;
  totalNoOfQuestions!: number;
}
