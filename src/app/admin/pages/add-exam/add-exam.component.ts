import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProgramResponse } from '../../../models/programs';
import { SubjectResponse } from '../../../models/subjects';
import { SemesterResponse } from '../../../models/semesters';
import { ExamRequest } from '../../../models/exam';
import { environment } from '../../../Environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.scss',
})
export class AddExamComponent implements OnInit {
  constructor(private service: BaseService,private route:Router) {}
  subjects: SubjectResponse[] = [];
  programs: ProgramResponse[] = [];
  semesters: SemesterResponse[] = [];
  newExam: ExamRequest = new ExamRequest();
  ngOnInit(): void {
    this.getAllPrograms();
    this.getAllSemesters();
    this.getAllSubjects();
  }

  getAllPrograms(): void {
    this.service.Fetch<ProgramResponse[]>('admin/programs').subscribe({
      next: (response) => (this.programs = response.result),
    });
  }

  getAllSubjects(): void {
    this.service.Fetch<SubjectResponse[]>('subjects').subscribe({
      next: (response) => (this.subjects = response.result),
    });
  }

  getAllSemesters(): void {
    this.service.Fetch<SemesterResponse[]>('admin/semesters').subscribe({
      next: (response) => (this.semesters = response.result),
    });
  }

  addExam(): void {
    this.service.Post<ExamRequest, any>(this.newExam, 'exams').subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.route.navigate(['/admin/exams'])
          environment.fireSuccessSwal(response.message);
        } else {
          environment.fireErrorSwal(response.message);
        }
      },
      error: (err) => {
        environment.fireErrorSwal(err.message);
      },
    });
  }
}
