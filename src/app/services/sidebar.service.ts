import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]=[{
    //si quisiera hacer un menu de sidebar mas grande, deberia especificarlo sobre este arreglo declarado.
    title:'Dashboard',
    icono:'mdi mdi-gauge',
    submenu:[
      {titulo:'Main',url:'/'},
      {titulo:'Gráficas', url:'grafica1'},
      {titulo:'Rxjs', url:'rxjs'},
      {titulo:'Promesas', url:'promesas'},
      {titulo:'ProgressBar', url:'progress'},

    ],


  },
  {
    title:'Mantenimientos',
    icono:'mdi mdi-folder-lock-open',
    submenu:[
      {titulo:'Usuarios',url:'usuarios'},
      {titulo:'Hospitales', url:'hospitales'},
      {titulo:'Médicos', url:'medicos'},


    ],
    //si quisiera hacer un menu de sidebar mas grande, deberia especificarlo sobre este arreglo declarado.

  }


];



  constructor() { }





}
