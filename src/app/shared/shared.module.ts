import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './pages/spinner/spinner.component';
import { ProfilePhotoComponent } from './pages/profile-photo/profile-photo.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SpinnerComponent,
    ProfilePhotoComponent
  ],
  exports:[SpinnerComponent,ProfilePhotoComponent]
})
export class SharedModule { }
