import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from 'src/app/models/usuario.model';
import { FilesUploadService } from 'src/app/services/files-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!:FormGroup
  public usuario!:Usuario
  public imagenSubir!:File;
  public imgTemp!:any;

  constructor(
      private fb:FormBuilder,
      private usuarioService:UsuarioService,
      private fileUploadService:FilesUploadService) {
      //en caso de que se modifique este usuario, se modificara en todos los lugares donde tenga esta informacion.
      //esto se debe a que usuario se pasa por referencia y porque estoy utilizando el usuarioService en los componentes.
      //de esta manera hago la asignacion al puntero donde esta la informacion.
      this.usuario = usuarioService.usuario;

   }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }


  actualizarPerfil(){
    console.log(this.perfilForm.value);

    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe(()=>{
      const {nombre, email} = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios fueron guardados con éxito', 'success')
    }, (err)=>{
      Swal.fire('No guardado',  `${err.error.msg}`, 'error')

      console.log(err.error.msg);
    }
    )
  }

  cambiarImagen(event:any){
    const file = event.target.files[0];
    this.imagenSubir = file;

    if(!this.imagenSubir){
      this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = ()=>{
      this.imgTemp = reader.result;

    }
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
    .then(img => {

      Swal.fire('Guardado', 'Avatar actualizado con éxito', 'success')

      this.usuario.img = img
    }).catch(err=>{
      Swal.fire('No Guardado', err, 'error')

    })
  }
}
