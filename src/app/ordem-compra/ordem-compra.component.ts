import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Bd } from './../bd.service';
import * as backend from 'firebase'
import { UsuarioPedido } from '../shared/usuario-pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []

  public alerta: string
  public estiloAlerta: string

  public email: string = ''
  public usuarioPedido: UsuarioPedido = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    celular: '',
    endereco: {
      rua: '',
      numero: null,
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: ''
    }
  }

  public form: FormGroup = new FormGroup({
    'endereco': new FormControl(null),
    'numero': new FormControl(null),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })


  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
    private bd: Bd
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()

    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email

      this.consultarUsuario()
    })
  }

  public consultarUsuario(): void {
    this.bd.consultarUsuario(this.email)
      .then((usuario: any) => {
        if (usuario.nome) this.usuarioPedido.nome = usuario.nome
        if (usuario.email) this.usuarioPedido.email = usuario.email
        if (usuario.cpf) this.usuarioPedido.cpf = usuario.cpf
        if (usuario.telefone) this.usuarioPedido.telefone = usuario.telefone
        if (usuario.celular) this.usuarioPedido.celular = usuario.celular
        if (usuario.endereco) this.usuarioPedido.endereco = usuario.endereco
      })
  }

  public confirmarCompra(): void {
    if (this.form.status === 'INVALID') {
      this.form.get('formaPagamento').markAsTouched()
    } else {

      if (this.carrinhoService.exibirItens().length === 0) {
        this.alert('danger', 'Não há produtos no seu carrinho.')
      } else if (this.email === '') {
        this.alert('danger', 'Você precisa estar logado para finalizar a compra.')
      } else {

        let pedido: Pedido = new Pedido(
          this.usuarioPedido.nome,
          this.usuarioPedido.email,
          this.usuarioPedido.cpf,
          this.usuarioPedido.telefone,
          this.usuarioPedido.celular,
          this.usuarioPedido.endereco,
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

  public diminuir(item: ItemCarrinho) {
    this.carrinhoService.diminuirQuantidade(item)
  }

  public adicionar(item: ItemCarrinho) {
    this.carrinhoService.adicionarQuantidade(item)
  }

  public alert(estilo: string, mensagem: string): void {
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      this.alerta = ''
      this.estiloAlerta = ''
    }, 3000)
  }
}
