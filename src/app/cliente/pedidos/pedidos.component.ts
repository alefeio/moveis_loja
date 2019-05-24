import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import * as backend from 'firebase'

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public email: string
  public pedidos: any

  constructor(private bd: Bd) { }

  ngOnInit() {
    // backend.auth().onAuthStateChanged((user) => {
      // this.email = user.email
      this.consultarPedidos()
    // })
  }

  consultarPedidos() {
    // this.bd.consultarPedidos(this.email)
    //   .then((pedidos: any) => {
    //     this.pedidos = pedidos
    //     console.log(this.pedidos)
    //   })
  }
}
