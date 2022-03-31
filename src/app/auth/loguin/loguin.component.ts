import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoguinComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }



  login(){
    this.router.navigateByUrl('/');
  }

}
