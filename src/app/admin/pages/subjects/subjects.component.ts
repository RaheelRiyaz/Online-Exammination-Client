import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { AddSubject, SubjectResponse } from '../../../models/subjects';
import { environment } from '../../../Environment/environment';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.scss',
})
export class SubjectsComponent implements OnInit {
  constructor(private service: BaseService) {}
  showSpinner: boolean = true;
  subjects: SubjectResponse[] = [];
  ngOnInit(): void {
    this.getAllSubjects();
  }

  getAllSubjects(): void {
    this.service.Fetch<SubjectResponse[]>('subjects').subscribe({
      next: (response) => {
        this.showSpinner = false;
        this.subjects = response.result;
      },
      error: (err) => {
        this.showSpinner = false;
        console.log(err);
      },
    });
  }

  updateSubject(id: string, name: string): void {
    console.log(id, name);
  }
  deleteSubject(id: string): void {
    environment
      .fireConfirmSwal('Are you sure you want to delete this subject?')
      .then((res) => {
        if (res.isConfirmed) {
        }
      });
  }
  async addNewSubject() {
    environment.fireInputSwal('Subject').then((res) => {
      if (res) {
        this.service
          .Post<AddSubject, SubjectResponse>(new AddSubject(res), 'subjects')
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.getAllSubjects();
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
}
