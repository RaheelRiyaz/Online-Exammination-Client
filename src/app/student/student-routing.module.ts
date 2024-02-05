import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentNotificationsComponent } from './pages/student-notifications/student-notifications.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { QuestionPaperComponent } from './pages/question-paper/question-paper.component';
import { ResultComponent } from './pages/result/result.component';
import { StudentResultComponent } from './pages/student-result/student-result.component';

const routes: Routes = [
  {path:'',component:StudentComponent,children:[
    {path:'',component:HomeComponent},
    {path:'notifications',component:StudentNotificationsComponent},
    {path:'exams',component:ExamsComponent},
    {path:'result',component:ResultComponent},
    {path:'result/check',component:StudentResultComponent},
    {path:'exams/questionpaper/:id',component:QuestionPaperComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
