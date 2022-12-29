import { environment } from "src/environments/environment";
const base_url = environment.base_url;

export class Usuario{

  constructor(
      public nombre:string,
      public email: string,
      public password: string,
      public google?: boolean,
      public img?:string,
      public role?: string,
      public uid?:string){

      }

      imprimirUsuario(){
        console.log(this.nombre);
      }

      get imagenUrl(){
        if(this.img){

          console.log(this.img);
        }



        if( this.img ){
          return `${base_url}/upload/usuarios/${this.img}`;
        }
        return `${base_url}/upload/usuarios/no-image.jpg`;

      }

}
