import Swal from 'sweetalert2';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay, subscribeOn } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
public totalUsuarios:number = 0;
public usuarios: Usuario[]=[];
public usuariosTemp: Usuario[]=[];
public userLoginUid!:string;
public desde:number = 0;
public loading:boolean = true;
public imgSubs!:Subscription;

  constructor(private usuarioService:UsuarioService,
              private busquedasService:BusquedasService,
              private modalImagenService:ModalImagenService) { }


  //  para evitar fugas de memoria y que no se vuelva a cargar accidentalmente
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.userLoginUid = this.usuarioService.uid;
  // para solucionar que no funciona el eventEmitter, se le agrega un delay ya que sino, el cambio se hace tan rapido que no se tiene en cuenta.
   this.imgSubs =  this.modalImagenService.imagenActualizada
    .pipe(
      delay(100)
    )
    .subscribe(
          resp => this.cargarUsuarios()
    )
  }

  cargarUsuarios(){
    this.loading = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe(({total,usuarios})=>{
        this.totalUsuarios = total
        this.usuarios = usuarios;
        this.usuariosTemp= usuarios;
        this.loading = false;

    })

  }

  cambiarPagina(valor:number){
    this.desde += valor

    if(this.desde < 0){
      this.desde = 0
    }
    if(this.desde > this.totalUsuarios){
      this.desde -= valor;
    }

    this.cargarUsuarios()
  }

  buscar(termino:string){
    console.log(termino);
    if(termino.length !== 0){
      this.busquedasService.buscar('usuarios', termino).subscribe(
        (results)=>{
          this.usuarios = results
        }
      )
    }else{
      this.usuarios = this.usuariosTemp;
    }

  }

  eliminarUsuario(usuario:Usuario){


    Swal.fire({
      title: 'Borrar usuario?',
      text: `Se eliminará a ${usuario.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result)=>{



      if(result.isConfirmed){
        this.usuarioService.eliminarUsuario(usuario).subscribe(
        () => {
          Swal.fire(
            'Usuario borrado',
            `${usuario.nombre} eliminado correctamente`,
            'success'
          )
        })
      }
    }).finally(()=>{
      this.cargarUsuarios();
    })
  }

  cambiarRole(usuario:Usuario){
    this.usuarioService.guardarUsuario(usuario).subscribe(
      resp=>{
        console.log(resp);
      }
    )
  }

  abrirModal(usuario:Usuario){
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img );
  }

}
