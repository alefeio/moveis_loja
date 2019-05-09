import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  constructor() {}

  ngOnInit() {
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

  // public confirmarCompra(): void {
  //   if (this.form.status === 'INVALID') {
  //     this.form.get('formaPagamento').markAsTouched()
  //   } else {
  //     if (this.carrinhoService.exibirItens().length === 0) {
  //       this.alert('danger', 'Não há produtos no seu carrinho.')
  //     } else if (this.email === null || this.email === '') {
  //       this.alert('danger', 'Você precisa estar logado para finalizar a compra.')
  //       setTimeout(() => {
  //         $('#modal-login').modal('show')
  //       }, 4000)
  //     }
  //     if (this.email != "" && this.usuarioPedido.endereco.bairro != "" &&
  //       this.usuarioPedido.endereco.cep != "" &&
  //       this.usuarioPedido.endereco.cidade != "" &&
  //       this.usuarioPedido.endereco.complemento != "" &&
  //       this.usuarioPedido.endereco.numero != null &&
  //       this.usuarioPedido.endereco.rua != "" &&
  //       this.usuarioPedido.endereco.uf != "") {
  //       let pedido: Pedido = new Pedido(
  //         this.usuarioPedido.nome,
  //         this.usuarioPedido.codigo,
  //         this.usuarioPedido.email,
  //         this.usuarioPedido.cpf,
  //         this.usuarioPedido.telefone,
  //         this.usuarioPedido.celular,
  //         this.usuarioPedido.endereco,
  //         // this.form.value.formaPagamento,
  //         this.carrinhoService.exibirItens()
  //       )
  //       pedido.codigo = this.gerarCodigo();
  //       this.bd.efetivarCompra(pedido)
  //         .then(idPedido => {
  //           this.mostrarAlert = 1;
  //           $('#exampleModal').modal('show')
  //           this.idPedidoCompra = pedido.codigo;
  //           if (this.email != '' || this.idPedidoCompra != undefined) {
  //             this.itensCarrinho = [];
  //             console.log('carrinho vazio', this.itensCarrinho)
  //           }
  //           if (this.itensCarrinho.length == 0) {
  //             this.mostrar = 0
  //           } else {
  //             this.mostrar = 1
  //           }
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     }
  //   }
  // }

  // public acompanhaUpload(): void {
  //   let continua = new Subject()
  //   let acompanhamentoUpload = interval(500)
  //   continua.next(true)
  //   acompanhamentoUpload
  //     .pipe(takeUntil(continua))
  //     .subscribe(() => {
  //       this.progressoPublicacao = 'andamento'
  //       this.porcentegemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)
  //       if (this.progresso.status === 'concluido') {
  //         this.progressoPublicacao = 'concluido'
  //         continua.next(false)
  //         setTimeout(() => {
  //           this.progressoPublicacao = 'pendente'
  //           this.form.patchValue({
  //             endereco: null,
  //             numero: null,
  //             complemento: null,
  //             formaPagamento: null
  //           })
  //         }, 4000)
  //       }
  //     })
  // }
}
