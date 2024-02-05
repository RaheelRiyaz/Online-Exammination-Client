import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseService } from '../../../services/base.service';
import { AddProgram, ProgramResponse } from '../../../models/programs';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../Environment/environment';
import { SpinnerComponent } from '../../../shared/pages/spinner/spinner.component';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule, FormsModule, SpinnerComponent],
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent implements OnInit {
  constructor(private service: BaseService) {}
  showSpinner: boolean = true;
  programs: ProgramResponse[] = [];
  ngOnInit(): void {
    this.getAllPrograms();
  }

  getAllPrograms(): void {
    this.service.Fetch<ProgramResponse[]>('admin/programs').subscribe({
      next: (response) => {
        this.showSpinner = false;
        this.programs = response.result;
      },
      error: (err) => {
        this.showSpinner = false;
        console.log(err);
      },
    });
  }

  updateProgram(id: string, name: string): void {}
  deleteProgram(id: string): void {
    environment
      .fireConfirmSwal('Are you sure you want to delete this Progrm?')
      .then((res) => {
        if (res.isConfirmed) {
        }
      });
  }

  addNewprogram(): void {
    environment.fireInputSwal('Program').then((res) => {
      if (res) {
        this.service
          .Post<AddProgram, ProgramResponse>(
            new AddProgram(res),
            'admin/program'
          )
          .subscribe({
            next: (response) => {
              if (response.isSuccess) {
                environment.fireSuccessSwal(response.message);
                this.getAllPrograms();
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
