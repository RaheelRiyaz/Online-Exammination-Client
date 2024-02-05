import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuestionRequest, QuestionResponse } from '../../../models/paper';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../Environment/environment';

@Component({
  selector: 'app-add-question',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.scss',
})
export class AddQuestionComponent implements OnInit {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (res) => (this.question.examId = res['id'])
    );
  }
  question: QuestionRequest = new QuestionRequest();

  addQuestion(): void {
    this.service
      .Post<QuestionRequest, QuestionResponse>(this.question, 'admin/add-paper')
      .subscribe({
        next: (response) => {
          if (response.isSuccess) {
            environment.fireSuccessSwal(response.message);
          } else {
            environment.fireErrorSwal(response.message);
          }
        },
        error: (error: Error) => {
          environment.fireErrorSwal(error.message);
        },
      });
  }
}
