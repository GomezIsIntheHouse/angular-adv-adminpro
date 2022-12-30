import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';


//Modulos
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';









@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent, //en caso de usar dichos modulos fuera del modulo de pages, habria que exportarlos.
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
    AccountSettingsComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    //el modulo del Shared, lo importo en el modulo de PAGES, ya que en el modulo de AUTH (por ej) no se utiliza para nada
    //y seria totalmente innecesario hacerlo.
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ComponentsModule,


  ]
})
export class PagesModule { }
