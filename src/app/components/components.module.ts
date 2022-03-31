import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms'

import { IncrementadorComponent } from './incrementador/incrementador.component';

import { DonutComponent } from './donut/donut.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    IncrementadorComponent,
    DonutComponent
  ],
  exports:[
    IncrementadorComponent,
    DonutComponent //exporto el component para que se pueda usar en otro modulo. Lo voy a utilizar en Grafica1
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
