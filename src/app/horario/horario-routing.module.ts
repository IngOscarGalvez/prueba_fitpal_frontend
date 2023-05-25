import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'horarios', redirectTo: 'horarios/index', pathMatch: 'full'},
  { path: 'horarios/index', component: IndexComponent },
  { path: 'horarios/create', component: CreateComponent },
  { path: 'horarios/edit/:idhorarios', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }
