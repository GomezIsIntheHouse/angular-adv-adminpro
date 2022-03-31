import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoguinComponent } from './loguin/loguin.component';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    LoguinComponent,
    RegisterComponent,],
  exports:[
    LoguinComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

  ]
})
export class AuthModule { }
