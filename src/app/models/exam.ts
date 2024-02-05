export class BaseExam {
  batch!: string;
  description!: string;
  eachQuestionMarks!: number;
  endDate!: Date;
  examDuration!: number;
  examPassMarks!: number;
  examTotalMarks!: number;
  name!: string;
  semesterId: string='';
  subjectId: string='';
  startDate!: Date;
  programId: string='';
  totalNoOfQuestions!: number;
}

export class ExamResponse extends BaseExam {
  id!: string;
  programName!: string;
  semester!: number;
  subjectName!: string;
  isConducted!: boolean;
}

export class ExamRequest extends BaseExam {}
