import { Component, OnInit, Input } from '@angular/core';
import { CarrinhoService } from '../../carrinho.service'
import { Pedido } from '../../shared/pedido.model'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ItemCarrinho } from '../../shared/item-carrinho.model';
import { Bd } from '../../bd.service';
import * as uid from 'uuid/v4';
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
    public carrinhoService: CarrinhoService,
    private bd: Bd,
    private rota: Router,
    private rotaAtiva: ActivatedRoute,
    private sessao: SessionService
  ) { }

  ngOnInit() {
    localStorage.removeItem('pedido');
    this.itensCarrinho = this.carrinhoService.exibirItens()
    this.consultarUsuario()
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
      if (usuario.endereco === undefined ||
        (usuario.endereco.bairro === "" ||
          usuario.endereco.cep === "" ||
          usuario.endereco.cidade === "" ||
          usuario.endereco.complemento === "" ||
          usuario.endereco.numero === "" ||
          usuario.endereco.pontoReferencia === "" ||
          usuario.endereco.rua === "" ||
          usuario.endereco.uf === "")) {
        this.usuarioPedido.endereco = undefined
      } else {
        this.usuarioPedido.endereco = usuario.endereco
      }
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
        this.usuarioPedido._id,
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
      this.Temporizador();
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

  Temporizador() {
    console.log('executar temporizador');
    setTimeout(()=>{
      if(this.sessao.logado === false){
        this.Temporizador();
        console.log('repetir');
      } else {
        this.fecharPedido();
      }
    }, 1000);
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
