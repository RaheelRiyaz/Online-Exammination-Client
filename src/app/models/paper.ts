export class BasePaper {
  examId!: string;
  question!: string;
  optionA!: string;
  optionB!: string;
  optionC!: string;
  optionD!: string;
}

export class AdminPaper extends BasePaper {
  id!: string;
  ceatedOn!: Date;
  updatedOn!: Date;
}

export class QuestionRequest extends BasePaper {
  correctOption: number = 0;
}

export class QuestionResponse extends AdminPaper {}

export class StudentQuestionPaper {
  examDuration!: number;
  examPassMarks!: number;
  examTotalMarks!: number;
  totalNoOfQuestions!: number;
  eachQuestionMarks!: number;
  subjectName!: number;
  examId!: string;
  semester!: number;
  programName!: string;
  batch!: string;
  paperTitle!: string;
  startDate!: string;
  questions!: [
    {
      question: string;
      id: string;
      optionA: string;
      optionB: string;
      optionC: string;
      optionD: string;
    }
  ];
}

export class Answer {
  constructor(public questionId: string, private answer: number) {}
}

export class SubmitPaper {
  examId!: string;
  entityId!: string;
  questionAnswers!: Answer[];
}
