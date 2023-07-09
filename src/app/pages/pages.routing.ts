import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';



const routes: Routes = [
  {path:'dashboard',
    component:PagesComponent,
    //rutas hijas del componente de PagesComponent
    canActivate:[AuthGuard],  //con este canActivate, podemos validar que una persona registrada y autorizada puede acceder a mi sitio web
  children:[
    {path: '', component: DashboardComponent, data: {title:'Dashboard'}},
    {path: 'progress', component: ProgressComponent, data: {title:'ProgressBar'}},
    {path: 'grafica1', component: Grafica1Component, data: {title:'Gráficas'}},
    {path: 'account-settings', component: AccountSettingsComponent, data:{title:'Settings'}},
    {path: 'promesas', component: PromesasComponent, data: {title:'Promesas'}},
    {path: 'rxjs', component: RxjsComponent, data: {title:'RXJS'}},
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},

    // Mantenimientos
    { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuario de aplicación' }},

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
