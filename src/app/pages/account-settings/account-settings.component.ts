import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {


  constructor(private settingsService:SettingsService) { }

  ngOnInit(): void {




    this.settingsService.checkCurrentTheme();


  }
  //funcion para cambiar el tema de mi web
  //falta mantener la seleccion del tema: lo hago con la funcion this.checkCurrentTheme();

  changeTheme(theme: string){

    this.settingsService.changeTheme(theme);

  }



}
