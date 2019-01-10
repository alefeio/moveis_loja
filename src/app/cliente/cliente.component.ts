import { Bd } from './../bd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as backend from 'firebase'

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @ViewChild('chamados') public chamados: any

  public email: any
  public usuario: any = ''
  public link: string = 'inicio'

  constructor(private bd: Bd) { }

  ngOnInit() {
    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.consultarUsuario()
    })
  }

  public consultarUsuario(): void {
    this.bd.consultarUsuario(this.email)
      .then((usuario: any) => {
        this.usuario = usuario
        // console.log('Usuário: ', this.usuario)
      })
  }

  public consultarChamados(): void { 
    this.chamados.consultarChamados()
  }

  public alterarLink(link: string): void {
    this.link = link
  }

}
