import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checkresult, StudentResultResponse } from '../../../models/result';
import { FormsModule } from '@angular/forms';
import { SemesterResponse } from '../../../models/semesters';
import { ProgramResponse } from '../../../models/programs';
import { BaseService } from '../../../services/base.service';
import { response } from 'express';
import { error } from 'console';
import { environment } from '../../../Environment/environment';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  constructor(private service: BaseService) {}
  checkResult: Checkresult = new Checkresult();
  programs: ProgramResponse[] = [];
  semesters: SemesterResponse[] = [];
  studentResults: StudentResultResponse[] = [];
  isResult: boolean = false;
  ngOnInit(): void {
    this.getAllPrograms();
    this.getAllSemesters();
  }
  viewResult(): void {
    console.log(this.checkResult);
    this.service
      .Post<Checkresult, StudentResultResponse[]>(
        this.checkResult,
        'students/check-result'
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.isResult = true;
            this.studentResults = response.result;
          } else {
            environment.fireErrorSwal(response.message);
          }
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }

  getAllPrograms(): void {
    this.service.Fetch<ProgramResponse[]>('admin/programs').subscribe({
      next: (response) => (this.programs = response.result),
    });
  }

  getAllSemesters(): void {
    this.service.Fetch<SemesterResponse[]>('admin/semesters').subscribe({
      next: (response) => (this.semesters = response.result),
    });
  }
}
