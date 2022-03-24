import { NgModule } from '@angular/core';
//primero importo el modulo del router

import {RouterModule, Routes} from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoguinComponent } from './auth/loguin/loguin.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { Nopagefound404Component } from './pages/nopagefound404/nopagefound404.component';
import { PagesComponent } from './pages/pages.component';

//este es el modulo que necesitamos de exportar, ya que mediante la exportacion
// se hace posible a los demas modulos que usen de el. Y asi poder navegar

const routes:Routes=[
  {path:'',
  component:PagesComponent,
    //rutas hijas del componente de PagesComponent
  children:[
    {path: 'dashboard', component: DashboardComponent},
    {path: 'progress', component: ProgressComponent},
    {path: 'grafica1', component: Grafica1Component},
    {path: '', redirectTo:'/dashboard', pathMatch:'full'},
    //si estoy en alguna ruta con el / vacio, me redirecciona al dashboard
  ]
  },


  {path: 'login', component: LoguinComponent},
  {path: 'register', component: RegisterComponent},

  {path: '**', component: Nopagefound404Component},
  //cualquier otro path que no este definido en las palabras indicadas por el arreglo de rutas
  //me mostrara el noPageFound404






]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) //linea que me importa el arreglo de rutas principales
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
