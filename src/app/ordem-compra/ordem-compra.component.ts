import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { Bd } from './../bd.service';
import * as backend from 'firebase'
import { UsuarioPedido } from '../shared/usuario-pedido.model';
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as uid from 'uuid/v4';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { DadosAdicionais } from '../shared/dadosAdicionais.model';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {
  public idPedidoCompra: string
  uidCompra: string
  public itensCarrinho: ItemCarrinho[] = []
  mostrar: number
  mostrarAlert: number = 0
  public alerta: string
  public estiloAlerta: string
  public progressoPublicacao: string = 'pendente'
  public porcentegemUpload: number
  public email: string = ''
  mostrarFormulario: Boolean = false
  // formDadoAdicionais: FormGroup

  public usuarioPedido: UsuarioPedido = {
    nome: '',
    codigo: '',
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

  public dadosAdicionais: DadosAdicionais = {
    email: '',
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

  formDadoAdicionais: FormGroup = new FormGroup({
    telefone: new FormControl(null),
    celular: new FormControl(null, [Validators.required]),
    endereco: new FormGroup({
      rua: new FormControl(null, [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
      complemento: new FormControl(null, [Validators.required]),
      bairro: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      cidade: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required])
    })
  })

  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService,
    private bd: Bd,
    private progresso: Progresso,
    private http: Http,
    private formBuilder: FormBuilder,
    private rota: Router
  ) {
    $('html,body').scrollTop(0);
  }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.exibirItens()
    if (this.itensCarrinho.length == 0) {
      this.mostrar = 0
      this.mostrarFormulario = false
    } else {
      this.mostrar = 1
      this.mostrarFormulario = true
    }
    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.consultarUsuario()
      if (this.email === '' && this.itensCarrinho.length === 0) {
        this.mostrarFormulario = false
      }
      if (this.email === '' && this.itensCarrinho.length > 0) {
        this.mostrarFormulario = false
      }
      if (this.email != '' && this.itensCarrinho.length === 0) {
        this.mostrarFormulario = false
      } else {
        this.mostrarFormulario = true
      }
    })
  }

  gerarCodigo() {
    return uid()
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

  // incluirDadosPerfil() {
  //   let endereco = this.formDadoAdicionais.get('endereco').value
  //   endereco.cep = endereco.cep.replace(/[^\d]/g, "")
  //   let dadosAdicionais: DadosAdicionais = new DadosAdicionais(
  //     this.usuarioPedido.email,
  //     this.formDadoAdicionais.value.telefone.replace(/[^\d]/g, ""),
  //     this.formDadoAdicionais.value.celular.replace(/[^\d]/g, ""),
  //     endereco
  //   )
  //   this.consultarUsuario();
  //   this.bd.incluirDadosPerfil(dadosAdicionais)
  //     .then((feed: any) => {
  //       this.alert(feed.estilo, feed.msg)
  //       this.alerta = feed.msg
  //       this.formDadoAdicionais.reset();
  //       this.confirmarCompra()
  //     })
  // }

  public confirmarCompra(): void {
    if (this.form.status === 'INVALID') {
      this.form.get('formaPagamento').markAsTouched()
    } else {
      if (this.carrinhoService.exibirItens().length === 0) {
        this.alert('danger', 'Não há produtos no seu carrinho.')
      } else if (this.email === null || this.email === '') {
        this.alert('danger', 'Você precisa estar logado para finalizar a compra.')
        setTimeout(() => {
          $('#modal-login').modal('show')
        }, 4000)
      }
      if (this.email != "" && this.usuarioPedido.endereco.bairro != "" &&
        this.usuarioPedido.endereco.cep != "" &&
        this.usuarioPedido.endereco.cidade != "" &&
        this.usuarioPedido.endereco.complemento != "" &&
        this.usuarioPedido.endereco.numero != null &&
        this.usuarioPedido.endereco.rua != "" &&
        this.usuarioPedido.endereco.uf != "") {
        let pedido: Pedido = new Pedido(
          this.usuarioPedido.nome,
          this.usuarioPedido.codigo,
          this.usuarioPedido.email,
          this.usuarioPedido.cpf,
          this.usuarioPedido.telefone,
          this.usuarioPedido.celular,
          this.usuarioPedido.endereco,
          // this.form.value.formaPagamento,
          this.carrinhoService.exibirItens()
        )
        pedido.codigo = this.gerarCodigo();
        this.bd.efetivarCompra(pedido)
          .then(idPedido => {
            this.mostrarAlert = 1;
            $('#exampleModal').modal('show')
            this.idPedidoCompra = pedido.codigo;
            if (this.email != '' || this.idPedidoCompra != undefined) {
              this.itensCarrinho = [];
              console.log('carrinho vazio', this.itensCarrinho)
            }
            if (this.itensCarrinho.length == 0) {
              this.mostrar = 0
            } else {
              this.mostrar = 1
            }
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

  excluirItemCarrinho(i) {
    this.carrinhoService.excluir(i);
    if (this.itensCarrinho.length == 0) {
      this.mostrar = 0
    } else {
      this.mostrar = 1
    }
  }

  public consultaCEP() {
    let cep = this.formDadoAdicionais.get('endereco.cep').value
    console.log(cep)
    // transforma a variável em apenas dígitos
    if (cep) cep = cep.replace(/\D/g, '')
    // verifica se o cep possui valor
    if (cep != "")
      // validação do cep
      var validaCep = /^[0-9]{8}$/
    // valida o formato do cep
    if (validaCep.test(cep)) {
      this.resetaEndereco()
      this.http.get(`//viacep.com.br/ws/${cep}/json`)
        .pipe(map(dados => dados.json()))
        .subscribe(dados => this.populaEndereco(dados))
    }
  }

  public populaEndereco(dados) {
    this.formDadoAdicionais.patchValue({
      endereco: {
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    })
  }

  public resetaEndereco() {
    this.formDadoAdicionais.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        uf: null
      }
    })
  }

  public alert(estilo: string, mensagem: string): void {
    $('#exampleModal').modal('show');
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      $('#exampleModal').modal('hide');
      this.alerta = ''
      this.estiloAlerta = ''
    }, 4000)
  }

  public acompanhaUpload(): void {
    let continua = new Subject()
    let acompanhamentoUpload = interval(500)
    continua.next(true)
    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
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
