import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import * as backend from 'firebase'

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public email: string
  public produtos: any

  constructor(private bd: Bd) { }

  ngOnInit() {
    this.consultarProdutos()
  }

  public consultarProdutos(): void {
    this.bd.consultarProdutos()
      .then((produtos: any) => {
        this.produtos = produtos
      })
  }

}
