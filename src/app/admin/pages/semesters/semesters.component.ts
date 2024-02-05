import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { HttpClientModule } from '@angular/common/http';
import { SemesterRequest, SemesterResponse } from '../../../models/semesters';
import { environment } from '../../../Environment/environment';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-semesters',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SpinnerComponent, FormsModule],
  templateUrl: './semesters.component.html',
  styleUrl: './semesters.component.scss',
})
export class SemestersComponent implements OnInit {
  semesters: SemesterResponse[] = [];
  constructor(private service: BaseService) {}
  showSpinner: boolean = true;
  ngOnInit(): void {
    this.getAllSemesters();
  }

  getAllSemesters(): void {
    this.service.Fetch<SemesterResponse[]>('admin/semesters').subscribe({
      next: (response) => {
        this.showSpinner = false;
        this.semesters = response.result;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateSemester(id: string, name: string): void {}
  deleteSemester(id: string): void {
    environment
      .fireConfirmSwal('Are you sure you want to delete this Semester?')
      .then((res) => {
        if (res.isConfirmed) {
        }
      });
  }
  addNewsemester(): void {
    environment.fireInputSwal('Semester').then((res) => {
      if (res) {
        this.service
          .Post<SemesterRequest, SemesterResponse>(
            new SemesterRequest(res),
            'admin/semester'
          )
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.getAllSemesters();
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
