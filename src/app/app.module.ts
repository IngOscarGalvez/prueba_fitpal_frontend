import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ClaseModule } from './clase/clase.module';
import { HorarioModule } from './horario/horario.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ClaseModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HorarioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
