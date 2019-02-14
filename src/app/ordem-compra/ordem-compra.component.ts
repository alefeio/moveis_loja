import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Bd } from './../bd.service';
import * as backend from 'firebase'
import { UsuarioPedido } from '../shared/usuario-pedido.model';
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public idPedidoCompra: number
  public itensCarrinho: ItemCarrinho[] = []
  mostrar: number

  public alerta: string
  public estiloAlerta: string

  public progressoPublicacao: string = 'pendente'
  public porcentegemUpload: number

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
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    if (this.itensCarrinho.length == 0) {
      this.mostrar = 0
    } else {
      this.mostrar = 1
    }
    console.log(this.itensCarrinho);
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

        this.bd.efetivarCompra(pedido)
          .then(idPedido => {
            this.itensCarrinho = [];
            $('#exampleModal').modal('show')
            this.idPedidoCompra = idPedido.key
          })
          .catch(error => {
            console.log(error)
          })

      }
    }
  }

  public diminuir(item: ItemCarrinho) {
    this.carrinhoService.diminuirQuantidade(item)
    if (this.itensCarrinho.length === 0) {
      this.mostrar = 0;
    }
  }

  public adicionar(item: ItemCarrinho) {
    this.carrinhoService.adicionarQuantidade(item)
  }

  excluirItemCarrinho(i){
    this.carrinhoService.excluir(i);
    if (this.itensCarrinho.length == 0) {
      this.mostrar = 0
    } else {
      this.mostrar = 1
    }
  }

  public alert(estilo: string, mensagem: string): void {
    $('#exampleModal').modal('show');
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      $('#exampleModal').modal('hide');
      this.alerta = ''
      this.estiloAlerta = ''
    }, 5000)
  }

  public acompanhaUpload(): void {
    let continua = new Subject()

    let acompanhamentoUpload = interval(500)

    continua.next(true)

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        // console.log(this.progresso.estado)
        // console.log(this.progresso.status)

        this.progressoPublicacao = 'andamento'

        this.porcentegemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          continua.next(false)
          setTimeout(() => {
            this.progressoPublicacao = 'pendente'
            this.form.patchValue({
              endereco: null,
              numero: null,
              complemento: null,
              formaPagamento: null
            })
          }, 4000)
        }
      })
  }
}
