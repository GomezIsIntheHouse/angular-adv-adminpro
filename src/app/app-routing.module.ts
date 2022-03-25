import { NgModule } from '@angular/core';
//primero importo el modulo del router

import {RouterModule, Routes} from '@angular/router'
import { PagesRoutingModule } from './pages/pages.routing';


import { Nopagefound404Component } from './nopagefound404/nopagefound404.component';
import { AuthRoutingModule } from './auth/auth.routing';

//este es el modulo que necesitamos de exportar, ya que mediante la exportacion
// se hace posible a los demas modulos que usen de el. Y asi poder navegar

const routes:Routes=[

  //path: '/dashboard' PagesRouting
  //path: '/auth' AuthRouting
  //path:

  {path: '', redirectTo:'/dashboard', pathMatch:'full'}, //path de rutas por defecto
  {path: '**', component: Nopagefound404Component},
  //cualquier otro path que no este definido en las palabras indicadas por el arreglo de rutas
  //me mostrara el noPageFound404
]

@NgModule({

  imports: [
    RouterModule.forRoot(routes), //linea que me importa el arreglo de rutas principales
    PagesRoutingModule, //importo el sistema de rutas del modulo de PAGES, perteneciente al pages.routing.ts
    AuthRoutingModule //importo el sistema de rutas creado del modulo de AUTH, perteneciente a auth.routing.ts
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
