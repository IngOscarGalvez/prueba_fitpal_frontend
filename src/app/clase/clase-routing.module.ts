import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'clase', redirectTo: 'clase/index', pathMatch: 'full'},
  { path: 'clase/index', component: IndexComponent },
  { path: 'clase/create', component: CreateComponent },
  { path: 'clase/edit/:idclase', component: EditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaseRoutingModule { }
