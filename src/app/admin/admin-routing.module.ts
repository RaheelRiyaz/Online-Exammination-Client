import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { SemestersComponent } from './pages/semesters/semesters.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { AddExamComponent } from './pages/add-exam/add-exam.component';
import { QuestionPaperComponent } from './pages/question-paper/question-paper.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'exams',
        children: [
          { path: '', component: ExamsComponent },
          { path: 'add', component: AddExamComponent },
          { path: 'paper/:id', component: QuestionPaperComponent },
          { path: 'addquestion/:id', component: AddQuestionComponent },
        ],
      },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'programs', component: ProgramsComponent },
      { path: 'semesters', component: SemestersComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'gallery', component: GalleryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
