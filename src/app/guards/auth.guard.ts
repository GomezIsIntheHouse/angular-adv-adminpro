import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap } from 'rxjs';

import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //el router lo importo para que si un usuario no tiene un token valido, lo pueda llevar hacia otra pantalla
  constructor(private usuarioService:UsuarioService, private router:Router){

  }

  // el metodo canActivate devuelte TRUE or FALSE, en caso de TRUE, habilitará las diferentes rutas de mi app.
  //En caso de FALSE las deshabilitará

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

      return this.usuarioService.validarToken().pipe(
        tap((estaAutenticado)=>{
          //si el usuario no esta autenticado por el token. Lo envio al login
          if(!estaAutenticado){
            this.router.navigateByUrl('/login');
          }
        })
      )

  }


}
