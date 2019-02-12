import { Bd } from './../bd.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as backend from 'firebase';
declare var $:any

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
  fixarMenuCliente: number = 0

  constructor(private bd: Bd) {
    let _this = this;
    window.onscroll= function(){
      _this.fixarMenuCliente = window.pageYOffset || document.documentElement.scrollTop
    }
    $(document).ready(function() {
      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
      });
    });
   }

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
