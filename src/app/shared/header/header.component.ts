import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public imgUrl:string = '';

  constructor(private usuarioService:UsuarioService) {
    this.imgUrl = usuarioService.usuario.imagenUrl;
    console.log(this.imgUrl);
   }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
