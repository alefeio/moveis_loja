import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {
  
  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []

  public form: FormGroup = new FormGroup({
    'endereco': new FormControl(null, [Validators.required, Validators.minLength(3)]),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })


  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
  }

  public confirmarCompra(): void {
    if(this.form.status === 'INVALID'){

      this.form.get('endereco').markAsTouched()
      this.form.get('numero').markAsTouched()
      this.form.get('complemento').markAsTouched()
      this.form.get('formaPagamento').markAsTouched()
    } else{

      if(this.carrinhoService.exibirItens().length === 0){
        alert('Não há produtos no seu carrinho.')
      } else{
        let pedido: Pedido = new Pedido(
          this.form.value.endereco,
          this.form.value.numero,
          this.form.value.complemento,
          this.form.value.formaPagamento,
          this.carrinhoService.exibirItens()
        )

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido) => {
            this.idPedidoCompra = idPedido
            this.carrinhoService.limparCarrinho()
          })

      }
    }
  }

  public diminuir(item: ItemCarrinho){
    this.carrinhoService.diminuirQuantidade(item)
  }

  public adicionar(item: ItemCarrinho){
    this.carrinhoService.adicionarQuantidade(item)
  }
}
