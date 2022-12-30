import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FilesUploadService {

  constructor() { }

  async actualizarFoto(
    archivo:File,
    tipo: 'usuarios' | ' medicos' | 'hospitales',
    id: any
  ){

    try {

    const url = `${base_url}/upload/${tipo}/${id}`;
    const formData = new FormData(); //sirve para crear la data para enviar al fetch
    formData.append('imagen', archivo);

    const resp = await fetch(url, {
      method:'PUT',
      headers: {
        'x-token': localStorage.getItem('token') || ''
      },
      body: formData
    });

    const data = await resp.json()

    if (data.ok){
      return data.nombreArchivo;
    }else{
      console.log(data.msg);
      return false
    }



    } catch (error) {
      console.error(error)
      return false;
    }
  }

}
