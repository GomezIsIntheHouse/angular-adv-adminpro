import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
//import { EventEmitter } from 'stream';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit  {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

   //le digo a angular que este componente incrementador puede recibir una propiedad o informacion
   //desde el padre llamada progreso

  @Input('valor') progreso: number = 50;
  @Input() btnClass:string = 'btn-primary';



   //@Input() progreso: number = 50;

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();



  cambiarValor(valor:number){

    if(this.progreso >= 100 && valor >= 0){

      this.valorSalida.emit(100); //utilizando el output

      this.progreso=100;
      return;
    }

    if(this.progreso <= 0 && valor < 0 ){
      this.valorSalida.emit(0);//utilizando el output

      this.progreso=0;
      return;

    }

    this.progreso = this.progreso + valor;

    this.valorSalida.emit(this.progreso);//utilizando el output

  }

  onChange(nuevoValor:number){

  //tomo el valor capturado por onChange($event) --> el valor tomado -> nuevoValor.

  //1ero. Valido el valor tomado, para que no sea mayor a 100 ni menor a 0.

    if(nuevoValor >= 100){
      this.progreso = 100; //asigno valor correcto
    }else if(nuevoValor<=0){
      this.progreso=0; //asigno el valor correcto
    }else{
      this.progreso = nuevoValor; //en caso de que el valor indicado por el input sea comprendido entre 0 -100, lo asigno directamente al this.progreso.
    }

    this.valorSalida.emit(this.progreso);
  }

}
