import { Bd } from 'src/app/bd.service';
import { Component, OnInit } from '@angular/core';
import * as backend from 'firebase'

@Component({
  selector: 'app-chamados',
  templateUrl: './chamados.component.html',
  styleUrls: ['./chamados.component.css']
})
export class ChamadosComponent implements OnInit {

  public email: string
  public chamados: any

  constructor(private bd: Bd) { }

  ngOnInit() {
    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.consultarChamados()
    })
  }

  public consultarChamados(): void {
    this.bd.consultarChamados(this.email)
      .then((chamados: any) => {
        this.chamados = chamados
        // console.log(this.chamados)
      })
  }



}
