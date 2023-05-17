import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartiesComponent } from './parties/parties.component';

const routes: Routes = [
  {
    path: '',
    component: PartiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
