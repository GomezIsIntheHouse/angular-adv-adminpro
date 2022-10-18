import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi: any;
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });


  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private ngZone: NgZone ) { }

  ngAfterViewInit(): void {
    this.googleInit();

  }

  ngOnInit(): void {
    this.renderButton();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '645846603220-bv4dbvmavpua6cq7qhc29bm86itr77rm.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)

    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      {theme: 'outline', size: 'large'}
    );
  }

  handleCredentialResponse(response: any){
    console.log('Enconded JWT ID TOKEN: ' + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe((resp) => {
        // console.log({login : resp});
        this.ngZone.run(() => {
          this.router.navigate([ '/']);
        });


    });
  }

  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {

        if ( this.loginForm.get('remember').value ){
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        // Si sucede un error
        Swal.fire('Error', err.error.msg, 'error' );
      });

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
    });

    this.startApp();

  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;

    this.attachSignin( document.getElementById('my-signin2') );

  }

  attachSignin(element) {

    this.auth2.attachClickHandler( element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            this.usuarioService.loginGoogle( id_token )
              .subscribe( resp => {
                // Navegar al Dashboard
                this.ngZone.run( () => {
                  this.router.navigateByUrl('/');
                });
              });

        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
