import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bd } from '../../../bd.service';

@Component({
  selector: 'app-detalhe-pedido',
  templateUrl: './detalhe-pedido.component.html',
  styleUrls: ['./detalhe-pedido.component.css']
})
export class DetalhePedidoComponent implements OnInit {

  id:string
  pedidoDetalhe:any
  produtosPedido:Array<any> = [];

  constructor(private rotaAtivada:ActivatedRoute,
              private bd:Bd) { }

  ngOnInit() {
    this.rotaAtivada.params.subscribe((parametros:any)=>{
      this.id = parametros.id;
      this.buscarPedido();
    })
  }

  async buscarPedido(){
    let resp = await this.bd.buscarPedidoID(this.id); 
    this.pedidoDetalhe = resp[0];
    this.produtosPedido = resp[0].produtos;
    console.log(this.pedidoDetalhe)
  }

}