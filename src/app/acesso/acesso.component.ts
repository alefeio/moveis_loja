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
<<<<<<< HEAD
    this.cadastro = event === 'cadastro' ? true : false
    console.log(event);
=======
    if(event === 'cadastro'){
      this.cadastro = 'cadastro'
    } else if (event === 'recupSenha') {
      this.cadastro = 'recupSenha'
    } else {
      this.cadastro = 'login'
    }
>>>>>>> f3c77b110027f70930a3affd02fc8c6c6c0f433f
  }

}
