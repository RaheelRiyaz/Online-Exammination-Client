import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { ActivatedRoute } from '@angular/router';
import {
  Answer,
  QuestionResponse,
  StudentQuestionPaper,
  SubmitPaper,
} from '../../../models/paper';
import { response } from 'express';
import { environment } from '../../../Environment/environment';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-question-paper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-paper.component.html',
  styleUrl: './question-paper.component.scss',
})
export class QuestionPaperComponent {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute,
    private sharedService:SharedService
  ) {}
  examId!: string;

  answers: Answer[] = [];
  questionpaper: StudentQuestionPaper = new StudentQuestionPaper();
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => (this.examId = res['id']));
    this.getQuestionPaper();
  }

  getQuestionPaper(): void {
    this.service
      .Fetch<StudentQuestionPaper>(`students/my-paper/${this.examId}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.questionpaper = response.result;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  submitAnswer(id: string, e: any): void {
    const answer = new Answer(id, Number(e.target.value));

    if (this.answers.some((_) => _.questionId === id)) {
      const index = this.answers.findIndex((_) => _.questionId === id);
      this.answers[index] = answer;
    } else {
      this.answers.push(answer);
    }
  }

  submitPaper(): void {
    const studentPaper = new SubmitPaper();
    studentPaper.examId = this.questionpaper.examId;
    studentPaper.entityId = this.sharedService.getSessionObject().id;
    studentPaper.questionAnswers = this.answers;
    console.log(studentPaper);

    this.service
      .Post<SubmitPaper, any>(studentPaper, 'students/submit-paper')
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            environment.fireSuccessSwal(response.message);
          } else {
            environment.fireErrorSwal(response.message);
          }
        },
        error: (err: Error) => {
          environment.fireErrorSwal(err.message);
        },
      });
  }
}
