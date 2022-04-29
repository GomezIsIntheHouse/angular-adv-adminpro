import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoguinComponent } from './loguin/loguin.component';

import { RegisterComponent } from './register/register.component';


import{HttpClientModule} from '@angular/common/http'



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
    ReactiveFormsModule, //para habilitar los formularios reactivos. Para definir los controles en el lado del .ts y no del lado del html
    HttpClientModule
  ]
})
export class AuthModule { }
