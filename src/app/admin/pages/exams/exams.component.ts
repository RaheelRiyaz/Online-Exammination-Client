import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';
import { environment } from '../../../Environment/environment';
import { FormsModule } from '@angular/forms';
import { ExamResponse } from '../../../models/exam';
import { RouterModule } from '@angular/router';
import { UploadResultRequest } from '../../../models/result';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SpinnerComponent,
    FormsModule,
    RouterModule,
  ],
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
    console.log("ad exams");
    
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

  updateExam(id: string, name: string): void {
    console.log(id, name);
  }
  deleteExam(id: string): void {
    environment
      .fireConfirmSwal('Are you sure you want to delete this subject?')
      .then((res) => {
        if (res.isConfirmed) {
        }
      });
  }
  async addNewExam() {
    environment.fireInputSwal('Subject').then((res) => {
      if (res) {
        this.newExam.name = res;
        this.service.Post<any, any>(this.newExam, 'subjects').subscribe({
          next: (response) => {
            if (response.isSuccess) {
              environment.fireSuccessSwal(response.message);
              this.getAllExams();
            } else {
              environment.fireErrorSwal(response.message);
            }
          },
          error: (err) => {
            environment.fireErrorSwal(err.message);
          },
        });
      }
    });
  }

  conductExam(id: string): void {
    environment
      .fireConfirmSwal(
        'Are you sure you want to conduct this exam on mentioned date?'
      )
      .then((res) => {
        if (res.isConfirmed) {
          console.log(id);
          this.service
            .Post<string, any>('', `admin/conduct-exam/${id}`)
            .subscribe({
              next: (response) => {
                console.log(response);
                if (response.isSuccess) {
                  this.getAllExams();
                  environment.fireSuccessSwal(response.message);
                } else {
                  environment.fireErrorSwal(response.message);
                }
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      });
  }

  uploadResult(id: string): void {
    environment
      .fireConfirmSwal('Are you sure you want to upload result?')
      .then((res) => {
        if (res.isConfirmed) {
          this.service
            .Post<UploadResultRequest, any>(
              new UploadResultRequest(id),
              `admin/upload-result`
            )
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
      });
  }
}
