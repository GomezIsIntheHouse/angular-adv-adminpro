import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public interval:any;

  constructor() {


    // this.retornaObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor=>console.log('Subs:', valor),
    //   error=> console.warn('Error fatal:', error),
    //   ()=> console.info('obs terminado')
    //   );

    //this.retornaIntervalo()
        // .subscribe((valor)=>{
        //   console.log(valor);
        // })
        //.subscribe(console.log )

    this.interval = this.retornaNuevoIntervalo().subscribe(console.log)


   }

  ngOnDestroy(): void {
    this.interval.unsubscribe();
  }



  retornaIntervalo():Observable<number>{

    return interval(1000)
          .pipe(
            take(4),
            map(valor => {
          return valor+1;
            })
    ); //1 seg
  }
  retornaNuevoIntervalo():Observable<number>{

    return interval(300)
          .pipe(
          take(10),
          map(valor => valor+1),
          filter(valor => (valor%2 === 0)? true: false),



    );
  }




  retornaObservable(): Observable<number>{
    let i=-1;

    const obs$ =new Observable<number>(observer=>{

          const intervalo = setInterval(()=>{

            i++;
            observer.next(i);
            if(i===4){
              clearInterval(intervalo);
              observer.complete();
            }
            if(i == 2){
              observer.error('erorr FATAL ') //termina el observable
            }

          }, 1000);



    });
    return obs$;
  }



}
