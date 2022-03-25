import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//module
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { Nopagefound404Component } from './nopagefound404/nopagefound404.component';




@NgModule({
  declarations: [
    AppComponent,
    Nopagefound404Component,



  ],
  imports: [  //todos los modulos van en los imports
    BrowserModule,
    AppRoutingModule,
    PagesModule, //modulo personalizado
    AuthModule //modulo personalizado
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
