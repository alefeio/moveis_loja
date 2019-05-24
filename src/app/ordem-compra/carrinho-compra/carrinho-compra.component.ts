import { Component, OnInit, Input } from '@angular/core';
import { OrdemCompraService } from '../../ordem-compra.service'
import { CarrinhoService } from '../../carrinho.service'
import { Pedido } from '../../shared/pedido.model'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ItemCarrinho } from '../../shared/item-carrinho.model';
import { Bd } from '../../bd.service';
import * as backend from 'firebase'
import { UsuarioPedido } from '../../shared/usuario-pedido.model';
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil, concatAll } from 'rxjs/operators';
import * as uid from 'uuid/v4';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { DadosAdicionais } from '../../shared/dadosAdicionais.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../sessao.service';
declare var $: any;

@Component({
  selector: 'app-carrinho-compra',
  templateUrl: './carrinho-compra.component.html',
  styleUrls: ['./carrinho-compra.component.css']
})
export class CarrinhoCompraComponent implements OnInit {

  itensCarrinho: ItemCarrinho[] = []
  email: string = ""
  alerta: string
  estiloAlerta: string
  mostrarAlert: number = 0
  idPedidoCompra: string
  form: FormGroup = new FormGroup({
    'endereco': new FormControl(null),
    'numero': new FormControl(null),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null, [Validators.required])
  })

  // usuarioPedido: UsuarioPedido = {
  //   _id: '',
  //   nome: '',
  //   codigo: '',
  //   email: '',
  //   cpf: '',
  //   telefone: '',
  //   celular: '',
  //   endereco: {
  //     rua: '',
  //     numero: null,
  //     complemento: '',
  //     pontoReferencia: '',
  //     bairro: '',
  //     cep: '',
  //     cidade: '',
  //     uf: ''
  //   }
  // }
  usuarioPedido: any = {}

  constructor(
    private carrinhoService: CarrinhoService,
    private bd: Bd,
    private rota: Router,
    private rotaAtiva: ActivatedRoute,
    private sessao: SessionService
  ) { }

  ngOnInit() {
    localStorage.removeItem('pedido');
    this.itensCarrinho = this.carrinhoService.exibirItens()
    // backend.auth().onAuthStateChanged((user) => {
    //   this.email = user.email
    this.consultarUsuario()
    // })
  }

  gerarCodigo() {
    return uid()
  }

  async consultarUsuario() {
    let usuarioID = this.sessao.getSessao();
    if (usuarioID != null) {
      let usuarioInfo = await this.bd.buscarUsuarioID(usuarioID._id)
      let usuario: any = usuarioInfo[0];
      if (usuario._id) {
        this.usuarioPedido._id = usuario._id
      }
      if (usuario.nome) {
        this.usuarioPedido.nome = usuario.nome
      }
      if (usuario.email) {
        this.usuarioPedido.email = usuario.email
      }
      if (usuario.cpf) {
        this.usuarioPedido.cpf = usuario.cpf
      }
      if (usuario.telefone === undefined) {
        this.usuarioPedido.telefone = undefined
      } else {
        this.usuarioPedido.telefone = usuario.telefone;
      }
      if (usuario.celular === undefined) {
        this.usuarioPedido.celular = undefined
      } else {
        this.usuarioPedido.celular = usuario.celular
      }
      if (usuario.endereco === undefined) {
        this.usuarioPedido.endereco = undefined
      } else {
        this.usuarioPedido.endereco = usuario.endereco
      }
      // this.bd.consultarUsuario(this.email)
      //   .then((usuario: any) => {
      //     if (usuario.nome) this.usuarioPedido.nome = usuario.nome
      //     if (usuario.email) this.usuarioPedido.email = usuario.email
      //     if (usuario.cpf) this.usuarioPedido.cpf = usuario.cpf
      //     if (usuario.telefone) this.usuarioPedido.telefone = usuario.telefone
      //     if (usuario.celular) this.usuarioPedido.celular = usuario.celular
      //     if (usuario.endereco) this.usuarioPedido.endereco = usuario.endereco
      //   })
    }
  }

  diminuir(item: ItemCarrinho) {
    this.carrinhoService.diminuirQuantidade(item)
  }

  adicionar(item: ItemCarrinho) {
    this.carrinhoService.adicionarQuantidade(item)
  }

  excluirItemCarrinho(i) {
    this.carrinhoService.excluir(i);
  }

  async fecharPedido() {
    await this.consultarUsuario();
    let pedido
    if (this.usuarioPedido != undefined) {
      pedido = new Pedido(
        this.usuarioPedido.nome,
        this.usuarioPedido.codigo,
        this.usuarioPedido.email,
        this.usuarioPedido.cpf,
        this.usuarioPedido.telefone,
        this.usuarioPedido.celular,
        this.usuarioPedido.endereco,
        this.carrinhoService.exibirItens()
      )
    }
    if (this.carrinhoService.exibirItens().length === 0) {
      this.alert('danger', 'Não há produtos no seu carrinho.')
    } else if (this.sessao.logado === false) {
      this.alert('danger', 'Você precisa estar logado para finalizar a compra.')
      setTimeout(() => {
        $('#modal-login').modal('show')
      }, 4000)
    } else {
      if (this.sessao.logado === true && this.usuarioPedido.endereco === undefined) {
        console.log('logado e sem dados de endereco')
        pedido.codigo = this.gerarCodigo();
        localStorage.setItem('pedido', JSON.stringify(pedido));
        this.alert('danger', 'Você precisa informar os seus dados de endereço!');
        setTimeout(() => {
          this.rota.navigate(['ordem-compra/dados-adicionais']);
          $('#exampleModal').modal('hide')
        }, 3000);
      } else {
        console.log('logado e como dados de endereco')
        pedido.codigo = this.gerarCodigo();
        localStorage.setItem('pedido', JSON.stringify(pedido));
        this.rota.navigate(['ordem-compra/pagamento']);
      }
    }
  }

  alert(estilo: string, mensagem: string): void {
    $('#exampleModal').modal('show');
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      $('#exampleModal').modal('hide');
      this.alerta = ''
      this.estiloAlerta = ''
    }, 4000)
  }
}
