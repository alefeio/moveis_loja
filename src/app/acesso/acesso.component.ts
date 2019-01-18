import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  public cadastro: string = 'login'

  constructor() { }

  ngOnInit() {
  }

  public exibirPainel(event: string): void {
    if(event === 'cadastro'){
      this.cadastro = 'cadastro'
    } else if (event === 'recupSenha') {
      this.cadastro = 'recupSenha'
    } else {
      this.cadastro = 'login'
    }
  }

}
