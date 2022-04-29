import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AbstractControlOptions} from "@angular/forms";
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    'register.component.css'
  ]
})

//validators: Son validaciones preconfiguradas por angular, que ayudan en la creacion de los form.
//esto me permite que el registro mantenga un estado, el cual puedo verificar mediante codigo.
export class RegisterComponent  {

  public formSubmitted = false;

  public registerForm=this.fb.group({

      //seteo valores por defecto, pero en un formulario real, estos valores  'Julian' deberian ser un string vacio : ''
    nombre:['', [Validators.required, Validators.minLength(3)]],
    email:['@gmail.com', [Validators.required, Validators.email]],
    password:['', Validators.required],
    password2:['', Validators.required],
    terminos:[true, Validators.required]

  },{
    validators: this.passwordsIguales('password','password2')
  });



  constructor( private fb:FormBuilder, private usuarioService:UsuarioService,private router:Router) {



  }

  //capturando la informacion del registerForm
//console.log(this.registerForm.value); imprimo por consola los valores del formulario para ir chequeando que todo vaya funcionando de maravilias
  crearUsuario(){

    this.formSubmitted=true;

    // MEDIANTE ESTE CONSOLE-LOG VOY A VER UNICAMENTE LOS VALORES DEL FORMULARIO (UTILIZADO PARA CORROBORAR DATOS)
    console.log(this.registerForm.value);

    // MEDIANTE ESTE CONSOLE-LOG VOY A VER TODO EL FORMULARIO COMPLETO. (UTILIZADO PARA CORROBORAR DATOS, ERRORES Y VALIDACIONES)

    console.log(this.registerForm);

    if(this.registerForm.invalid){
      console.log('%cFormulario no es correcto','font-size:15px; background:yellow; color:black; border:5px solid');
      return;
    }else{

      console.log('%cPosteando Formulario','font-size:15px; background:yellow; color:black');

    }

    //para poder utilizar el servicio creado de usuarioService, se hace de la siguiente manera.
    //realizo el posteo mediante este comando.
    this.usuarioService.crearUsuario(this.registerForm.value)
                        .subscribe((resp)=>{
                          Swal.fire({
                            icon: 'success',
                            title:'Usuario creado',

                            showConfirmButton: false,
                            timer: 1500


                          })
                          console.log('usuario creado');
                          console.log(resp);
                          this.router.navigateByUrl('/login');
                        },(err)=>{
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.error.msg,

                          })

                        });

                        // console.log("%cError al crear/registrar Nuevo Usuario","font-size:15px; background:yellow;border:5px solid ;color:black",err.error.msg))


  }

  campoNoValido(campo:string):boolean{


    //return true; //activa el warning

    if(this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  //mediante esta funcion, en caso de no aceptar los terminos y posterior intento de submit, el sistema lanzará un error por html
  aceptaTerminos(){
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }


  passwordNoValido(){

    const passw1= this.registerForm.get('password')?.value;

    const passw2 = this.registerForm.get('password2')?.value;



    if((passw1 !== passw2) && this.formSubmitted){
      return true;

    }else{
      return false;
    }




  }
  //valido si las password ingresadas son exactamente iguales. En caso que asi sean, se envia un TRUE

  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control!.value === pass2Control!.value ) {
        pass2Control!.setErrors(null)
      } else {
        pass2Control!.setErrors({ noEsIgual: true })
      }


    }
  }




}
