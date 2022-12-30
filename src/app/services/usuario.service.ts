//  Mediante este servicio voy a realizar peticiones http a mi servidor.

//se peude usar paquete de ajax, peticiones a travez de angular con http, etc.


// IMPORTANTE

/////con las peticiones de angular funcionan muy bien, podemos suubscribirnos, utilizar PIPE
/////para mapear, filtrar

//MUY IMPORTANTE:
//DICHO SERVICIO DEBE SER IMPORTADO EN AUTH MODULE
//YA QUE ESE MODULO es el encargado de la union entre el servicio de autenticacion (loguin + register)
//y con los demas servicios y componentes que son los encargados de mostrar la informacion al usuario

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
//interfaz creada manualmente
import { RegisterForm } from '../interfaces/register-form.interface';
import { tap, map, catchError } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interfaces';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

// const base_url= 'http://localhost:3000/api';

//constantes

const base_url = environment.base_url;
declare const gapi:any;


@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
//propiedades de clase
  public auth2:any;
  public usuario!:Usuario;

  constructor(private http:HttpClient, private router:Router, private ngZone:NgZone) {
    this.googleInit();
   }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get uid(){
    return this.usuario.uid || '';
  }

  googleInit(){

    return new Promise<void>(resolve=>{

      gapi.load('auth2', () =>{
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '586909249673-fevns2m04mstrvbkmp0pd9erdt44vjnt.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });

        resolve();

      });
    })


  }

  logout(){
    localStorage.removeItem('token');

      this.auth2.signOut().then(()=>{

          this.ngZone.run(()=>{
            this.router.navigateByUrl('/login');

          })

      });

  }



    validarToken():Observable<boolean>{


      //La siguiente instruccion me indica que la peticion, llevaria en su cabecera 'headers'
      //los items que le indico, no importa la cantidad. En este caso, solo bastaria con mandar el token.
      return this.http.get(`${base_url}/login/renew`,{
        headers:{
          'x-token': this.token
        }
      }).pipe(
        map((resp:any)=>{
          const { email, img = '', google, nombre,role, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '' , img, google, role, uid)

          // this.usuario.imprimirUsuario();

          localStorage.setItem('token', resp.token);
          return true;
        }),

        catchError(error=> of(false)  //si existe un error, el observable me devolverá un FALSE, para que de esta manera desactive el sistema de rutas importado en el CAN ACTIVATE
        )
      )
    }
  //con esta funcion recibo el formulario proveniente de REGISTER.COMPONENT.HTML y
  //  validado los campos mediante el    REGISTER.COMPONENT.ts.

  //Poder unir estos dos elementos es gracias al auth.module.ts y a que ambos componentes (REGISTER.COMPONENT y Usuarios.service.ts)
  //estan declarados en dicho modulo.

  crearUsuario(formData:RegisterForm){
    //podria crear una interfaz

    console.log('creando usuario');

    //envio la data del formulario(formData) por medio de una llamada al httpClient
    return this.http.post(`${base_url}/usuarios`, formData)
    .pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)
      })
    );

    //con el return no es necesario el SUBSCRIBE, ya que el subscribe puede realizarse
    //dentro del registerComponent.TS, que es el modulo que maneja las validaciones de datos del formulario


  }

  actualizarPerfil( data: { email:string, nombre:string, role:any} ){
  data = {
    ...data,
    role: this.usuario.role
  }
    return this.http.put(`${base_url}/usuarios/${this.uid}`, data,{ headers:{
      'x-token': this.token
    }});
  }

  login(formData:LoginForm){
    //podria crear una interfaz

    console.log('conectando usuario');

    //envio la data del formulario(formData) por medio de una llamada al httpClient http://localhost:3000/api/login/
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)

      })
    );

    //con el return no es necesario el SUBSCRIBE, ya que el subscribe puede realizarse
    //dentro del registerComponent.TS, que es el modulo que maneja las validaciones de datos del formulario






  }

  loginGoogle(token:any){
    console.log('conectando usuario');

    //envio la data del formulario(formData) por medio de una llamada al httpClient http://localhost:3000/api/login/
    return this.http.post(`${base_url}/login/google`, {token}).pipe(
      tap((resp:any)=>{
        localStorage.setItem('token', resp.token)

      })
    );

  }
}
