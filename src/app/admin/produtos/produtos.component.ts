import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public produtos: any

  @Output() public adicionarProduto: EventEmitter<any> = new EventEmitter<any>()

  constructor(private bd: Bd) { }

  ngOnInit() {
    this.consultarProdutos()
  }

  public consultarProdutos(): void {
    // this.bd.consultarProdutos()
    //   .then((produtos: any) => {
    //     this.produtos = produtos
    //     console.log(this.produtos)
    //   })
  }

}
