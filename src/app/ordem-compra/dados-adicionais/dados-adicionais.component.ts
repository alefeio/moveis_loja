import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { DadosAdicionais } from '../../shared/dadosAdicionais.model';
import { Bd } from '../../bd.service';
import * as backend from 'firebase';
import { UsuarioPedido } from '../../shared/usuario-pedido.model';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../carrinho.service';
import { SessionService } from '../../sessao.service';

declare var $: any


@Component({
  selector: 'app-dados-adicionais',
  templateUrl: './dados-adicionais.component.html',
  styleUrls: ['./dados-adicionais.component.css']
})
export class DadosAdicionaisComponent implements OnInit {

  email: any
  alerta: string
  estiloAlerta: string
  pedido: any
  formDadoAdicionais: FormGroup = new FormGroup({
    telefone: new FormControl(null),
    celular: new FormControl(null, [Validators.required]),
    endereco: new FormGroup({
      rua: new FormControl(null, [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
      complemento: new FormControl(null),
      bairro: new FormControl(null, [Validators.required]),
      pontoReferencia: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      cidade: new FormControl(null, [Validators.required]),
      uf: new FormControl(null, [Validators.required])
    })
  })

  dadosAdicionais: DadosAdicionais = {
    email: '',
    telefone: '',
    celular: '',
    endereco: {
      rua: '',
      numero: null,
      complemento: '',
      pontoReferencia: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: ''
    }
  }

  usuarioPedido: UsuarioPedido = {
    _id: '',
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
      pontoReferencia: '',
      bairro: '',
      cep: '',
      cidade: '',
      uf: ''
    }
  }

  constructor(private http: Http,
    private bd: Bd,
    private rota: Router,
    public carrinhoService: CarrinhoService,
    private sessao: SessionService) { }

  ngOnInit() {
    this.pedido = JSON.parse(localStorage.getItem('pedido'))
    this.email = this.sessao.getSessao();
    $('#exampleModal').modal('hide')
  }

  async incluirDadosPerfil() {
    let endereco = this.formDadoAdicionais.get('endereco').value
    endereco.cep = endereco.cep.replace(/[^\d]/g, "")
    let dadosAdicionais: DadosAdicionais = new DadosAdicionais(
      this.usuarioPedido.email = this.email.email,
      this.formDadoAdicionais.value.telefone.replace(/[^\d]/g, ""),
      this.formDadoAdicionais.value.celular.replace(/[^\d]/g, ""),
      endereco
    )
    this.pedidoAddDados(dadosAdicionais)
    await this.bd.incluirDadosPerfil(this.email._id, dadosAdicionais);
    this.formDadoAdicionais.reset();
  }

  pedidoAddDados(dadosAdicionais) {
    if(dadosAdicionais.celular){
      this.pedido.celular = dadosAdicionais.celular
    }
    if(dadosAdicionais.telefone){
      this.pedido.telefone = dadosAdicionais.telefone
    }
    if(dadosAdicionais.endereco){
      this.pedido.endereco = dadosAdicionais.endereco
    }
    localStorage.setItem('pedido', JSON.stringify(this.pedido));
    this.rota.navigate(['ordem-compra/pagamento']);
  }

  consultarUsuario(): void {
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

  consultaCEP() {
    let cep = this.formDadoAdicionais.get('endereco.cep').value
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

  populaEndereco(dados) {
    this.formDadoAdicionais.patchValue({
      endereco: {
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    })
  }

  resetaEndereco() {
    this.formDadoAdicionais.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        uf: null
      }
    })
  }

  voltarCarrinho() {
    this.rota.navigate(['ordem-compra/carrinho'])
    localStorage.removeItem('pedido');
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
