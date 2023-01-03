import { Injectable,EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment.prod';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  public tipo!: any;
  public id!:string
  public img:string = 'no-image'
  private _ocultarModal:boolean = true;

  public imagenActualizada: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(tipo: 'usuarios' | 'medicos' | 'hospitales', id:any, img?:string){
    this._ocultarModal = false;
    this.tipo = tipo
    this.id = id;


    if(img?.includes('https')){
      this.img = img;

    }else{
      this.img = `${base_url}/upload/${tipo}/${img}`
    }
  }

  cerrarModal(){
    this._ocultarModal = true;

  }
}
