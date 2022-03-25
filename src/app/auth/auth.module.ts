import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoguinComponent } from './loguin/loguin.component';
import { RegisterComponent } from './register/register.component';

import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoguinComponent,
    RegisterComponent,],
  exports:[
    LoguinComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
