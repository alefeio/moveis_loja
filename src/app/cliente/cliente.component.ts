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
    $(document).ready(function() {
      var menuCliente = $('#v-pills-tab');
      var btnCollapse = $('#btn-collapse');
      var areaCliente = $('#area-cliente');
      $(window).scroll(function(){
        if($(this).scrollTop() > 180) {
          menuCliente.addClass('menu-cliente');
          btnCollapse.addClass('menu-collapse');
          areaCliente.addClass('area-cliente');
        }else{
          menuCliente.removeClass('menu-cliente');
          btnCollapse.removeClass('menu-collapse');
          areaCliente.removeClass('area-cliente');
        }
      })
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
    // this.bd.consultarUsuario(this.email)
    //   .then((usuario: any) => {
    //     this.usuario = usuario
    //     // console.log('Usuário: ', this.usuario)
    //   })
  }

  public consultarChamados(): void { 
    this.chamados.consultarChamados()
  }

  public alterarLink(link: string): void {
    this.link = link
  }

}
