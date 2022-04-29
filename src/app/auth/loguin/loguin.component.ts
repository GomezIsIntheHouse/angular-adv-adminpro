import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';
declare const gapi:any;

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoguinComponent implements OnInit{
  public formSubmitted = false;
  public auth2:any;

  public loginForm=this.fb.group({

      //seteo valores por defecto, pero en un formulario real, estos valores  'Julian' deberian ser un string vacio : ''

    email:[localStorage.getItem('email') || '' , [Validators.required, Validators.email]],
    password:['', Validators.required],
    remember:[localStorage.getItem('remember') || false]


  });

  constructor( private router:Router, private UsuarioService:UsuarioService, private fb:FormBuilder, private ngZone:NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }





  login(){
    this.UsuarioService.login(this.loginForm.value)
                        .subscribe((resp:any)=>{
                          Swal.fire({
                            icon: 'success',

                            text: 'Bienvenido a nuestro sitio',
                            showConfirmButton: false,
                            timer: 1500
                          })

const remember = this.loginForm.get('remember')!.value;
const email = this.loginForm.get('email')!.value;

                          if(remember){
                            localStorage.setItem('remember',remember);
                            localStorage.setItem('email', email)


                          }else{
                            localStorage.removeItem('email');
                            localStorage.removeItem('remember');
                          }

                          this.router.navigateByUrl('/');

                        },(err:any)=>{
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.error.msg,
                            timer: 1500

                          })
                        })

  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',

    });
    this.startApp();
  }


//metodo de la clase que inicia el servicio de google
  async startApp(){

    await this.UsuarioService.googleInit();

    this.auth2 = this.UsuarioService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  };

  attachSignin(element:any) {

    this.auth2.attachClickHandler(element, {},
        (googleUser:any) =>{
          const id_token = googleUser.getAuthResponse().id_token;
          this.UsuarioService.loginGoogle(id_token).subscribe(
            (resp:any)=>{
              Swal.fire({
                icon: 'success',
                text: 'Bienvenido a nuestro sitio',
                showConfirmButton: false,
                timer: 1500
              })
              this.ngZone.run(()=>{
                this.router.navigateByUrl('/');

              })

            });


          // en caso de que sea correcto, navego al dashboard


        }, (error:any) =>{
          alert(JSON.stringify(error, undefined, 2));
        });
  }


}
