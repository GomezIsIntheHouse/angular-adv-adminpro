import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(private http: HttpClient) { }
//ambos getters estan duplicados con usuario.service. Para crear un solo metodo que me sirva para ambos servicios
// deberia crear un interceptor y solucionarlo.SOLUCION  A IMPLEMENTAR MAS ADELANTE 03/01/23.
  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers:{
      'x-token': this.token
    }}
  }

// Funcion privada que me sirve para crear una instancia de usuario con todos los atributos necesarios para obtenerlos en
// el template html
  private transformarUsuarios(resultados:any[]):Usuario[]{

    return resultados.map(
      user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
    );
  }

buscar(tipo:'usuarios'|'medicos'|'hospitales', termino:string = '', desde?:number){
    // ?desde=${ desde } seria para implementar una paginacion de users en la busqueda. SOLUCION A IMPLEMENTAR

    const url = `${ base_url }/todo/coleccion/${tipo}/${termino}`;

    return this.http.get<any[]>( url, this.headers )
        .pipe(
          map((resp:any) => {
            switch (tipo) {
              case 'usuarios':
                return this.transformarUsuarios(resp.resultados)
              default:
                return[];
            }
          })
        );

  }


}

