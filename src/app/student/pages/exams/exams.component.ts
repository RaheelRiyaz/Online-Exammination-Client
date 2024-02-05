import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamResponse } from '../../../models/exam';
import { BaseService } from '../../../services/base.service';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, SpinnerComponent ,RouterModule],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent {
  constructor(private service: BaseService) {}
  showSpinner: boolean = true;
  exams: ExamResponse[] = [];
  newExam: any;
  ngOnInit(): void {
    this.getAllExams();
    console.log("exams");
    
  }

  getAllExams(): void {
    this.service.Fetch<ExamResponse[]>('exams').subscribe({
      next: (response) => {
        this.showSpinner = false;
        this.exams = response.result;
        console.log(response);
      },
      error: (err) => {
        this.showSpinner = false;
        console.log(err);
      },
    });
  }
}
