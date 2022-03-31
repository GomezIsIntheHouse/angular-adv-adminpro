import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public linktheme = document.querySelector('#theme');

  constructor(  ) {
        // asignando un theme a page.

    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css' ;

    this.linktheme?.setAttribute('href', url);
  }

  changeTheme(theme: string){


    const url = `./assets/css/colors/${theme}.css`;

    this.linktheme?.setAttribute('href', url);

    //guardar en localStorage
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();




  }
  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector');;


    //borrar clase working
    //1ero barro todos los elementos que esten en la constante links

    links.forEach((element:any)=>{
      element.classList.remove('working');

      //2do averiguo que thema es el que actualmente esta seleccionado
      const btnTheme= element.getAttribute('data-theme');
      //3ero creo el url que esta seleccionado en el elemento html, en el boton seleccionador de colores,
      // utilizando la informacion de la linea anterior
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
       //4to extraigo el link de href="" que esta actualmente cargado en mi html
      const currentTheme = this.linktheme?.getAttribute('href');
      //5to valido que el currentTheme sea igual al btnThemeUrl

      if(btnThemeUrl === currentTheme){
        element.classList.add('working') //por ultimo se asigno la clase
      }


    })




  }

}
