import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-ambientes',
  templateUrl: './ambientes.component.html',
  styleUrls: ['./ambientes.component.css']
})
export class AmbientesComponent implements OnInit {

  public ambientes: any

  constructor(private bd: Bd) { }

  ngOnInit() {
    this.consultarAmbientes()
  }

  public consultarAmbientes(): void {
    // this.bd.consultarAmbientes()
    //   .then((ambientes: any) => {
    //     this.ambientes = ambientes
    //   })
  }

}
