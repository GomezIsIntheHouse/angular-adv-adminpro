import { Component} from '@angular/core';
//import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
// Doughnut

  public labels1:string[]=['Pan', 'Asado', 'Vino','Ensalada' ];

  public labels2:string[]=['Pescado', 'Carne Vaca', 'Carne Cerdo','Carne de Mamut' ];

  public labels3:string[]=['Gasolina', 'Gastos de Almacenado', 'Varios','Cableado' ];

  public labels4:string[]=['Soda', 'Yerba', 'Aceite','Choclo' ];


  public data1:number[]=  [ 35, 45, 10];
  public data2:number[] = [ 99, 85, 42 ];
  public data3:number[] = [ 33, 710, 78 ];
  public data4:number[] = [ 55, 66, 22  ];

}
