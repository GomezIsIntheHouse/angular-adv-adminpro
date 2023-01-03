import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';

import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FilesUploadService } from '../../services/files-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {
  // public ocultarModal: boolean = false;
  public imagenSubir!:File;
  public imgTemp!:any;

  constructor(public modalImagenService:ModalImagenService, private fileUploadService:FilesUploadService) { }

  ngOnInit(): void {
  }
  cerrarModal(){
    this.modalImagenService.cerrarModal()
    this.imgTemp = null;
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

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo , id)
    .then(img => {

      Swal.fire('Guardado', 'Avatar actualizado con éxito', 'success')

      this.modalImagenService.imagenActualizada.emit(img)

      this.cerrarModal()

    }).catch(err=>{
      Swal.fire('No Guardado', err, 'error')

    })

  }

}
