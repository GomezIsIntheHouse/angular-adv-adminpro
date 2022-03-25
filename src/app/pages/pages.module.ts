import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent, //en caso de usar dichos modulos fuera del modulo de pages, habria que exportarlos.
  ],
  //por lo anotando anteriormente, se declaran los exports.
  //Al exportar el modulo lo que digo es: estos 4 modulos al ser importados, estarian en sus respectivos lugares
  //del app.module.ts, pero la diferencia de hacerlo de esta manera, es que el app.mpodule.ts, queda mucho mas simplificado
  //y simple de leer.
  exports:[
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    //el modulo del Shared, lo importo en el modulo de PAGES, ya que en el modulo de AUTH no se utiliza para nada
    //y seria totalmente innecesario hacerlo.
    AppRoutingModule
  ]
})
export class PagesModule { }
