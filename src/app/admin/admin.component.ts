import { Bd } from './../bd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as backend from 'firebase'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  @ViewChild('produtos') public produtos: any
  @ViewChild('ambientes') public ambientes: any
  @ViewChild('linhas') public linhas: any

  public email: any
  public usuario: any = ''
  public link: string = 'inicio'

  constructor(private bd: Bd) { }

  ngOnInit() {
    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.consultarUsuario()
    })

    console.log(this.link)
  }

  public consultarUsuario(): void {
    this.bd.consultarUsuario(this.email)
      .then((usuario: any) => {
        this.usuario = usuario
        // console.log('Usuário: ', this.usuario)
      })
  }

  public consultarProdutos(): void { 
    this.produtos.consultarProdutos()
  }

  public consultarAmbientes(): void { 
    this.ambientes.consultarAmbientes()
  }

  public consultarLinhas(): void { 
    this.linhas.consultarLinhas()
  }

  public alterarLink(link: string): void {
    this.link = link
  }

}
