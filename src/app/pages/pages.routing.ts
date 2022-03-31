import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';



const routes: Routes = [
  {path:'dashboard',
    component:PagesComponent,
    //rutas hijas del componente de PagesComponent
  children:[
    {path: '', component: DashboardComponent},
    {path: 'progress', component: ProgressComponent},
    {path: 'grafica1', component: Grafica1Component},
    {path: 'account-settings', component: AccountSettingsComponent},


    //si estoy en alguna ruta con el / vacio, me redirecciona al dashboard
  ]},


  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], //este forchild es lo que voy a tener que importar en alguna parte para sumarlo al sistema de rutas de mi aplicacion
  exports: [RouterModule]
})
export class PagesRoutingModule {}
