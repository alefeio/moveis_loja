import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  mostrar:number = 0

  constructor(private carrinhoCompra:CarrinhoService) {}

  ngOnInit() {
    if(this.carrinhoCompra.itens.length === 0){
      this.mostrar = 0
    } else {
      this.mostrar = 1
    }
  }
}
