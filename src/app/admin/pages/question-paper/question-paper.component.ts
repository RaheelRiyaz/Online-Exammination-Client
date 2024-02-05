import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminPaper } from '../../../models/paper';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';

@Component({
  selector: 'app-question-paper',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, SpinnerComponent],
  templateUrl: './question-paper.component.html',
  styleUrl: './question-paper.component.scss',
})
export class QuestionPaperComponent implements OnInit {
  constructor(
    private service: BaseService,
    private activatedRoute: ActivatedRoute
  ) {}
  examId!: string;
  showSpinner: boolean = true;
  questions: AdminPaper[] = [];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => (this.examId = res['id']));
    this.getQuestionPaper();
  }

  getQuestionPaper(): void {
    this.service.Fetch<AdminPaper[]>(`admin/paper/${this.examId}`).subscribe({
      next: (response) => {
        this.showSpinner = false;
        if (response.isSuccess) this.questions = response.result;
      },
      error: (err) => {
        this.showSpinner = false;
        console.log(err);
      },
    });
  }
}
