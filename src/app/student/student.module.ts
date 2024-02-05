import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from '../services/base.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[BaseService]
})
export class StudentModule { }
