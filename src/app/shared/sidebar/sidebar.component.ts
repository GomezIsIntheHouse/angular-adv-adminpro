import { Component, OnInit } from '@angular/core';

import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  menuItems:any[]=[];


  constructor(private sidebarService:SidebarService) {

    this.menuItems=sidebarService.menu;
    //recorro los items del menu, precargados en sidebar.services.ts

    // console.log(this.menuItems);

  }

  ngOnInit(): void {
  }

}
