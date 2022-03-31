import { Component, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styles: [
  ]
})
export class DonutComponent {

// Doughnut
//'Label_1', 'Label_2', 'Label_3'

@Input() public title="Sin titulo";

@Input('label') public doughnutChartLabels:string[] = [  ];

@Input('data') public data:number[] = [35, 45, 10];



public doughnutChartData: ChartData <'doughnut'> = {

  labels: this.doughnutChartLabels,
  datasets:[{ data: this.data}]

};

// public doughnutChartType: ChartType = 'doughnut';



}


