import { PerfilUsuario } from './../../shared/perfil-usuario.model';
import { Bd } from 'src/app/bd.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as backend from 'firebase'
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  public email: any

  public alerta: string = '';
  public estiloAlerta: string

  public perfilUsuario: PerfilUsuario = {
    nome: '',
    email: '',
    cpf: '',
    nascimento: '',
    sexo: '',
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

  public formPerfil: FormGroup = new FormGroup({
    'nome': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.required),
    'cpf': new FormControl(null, Validators.required),
    'nascimento': new FormControl(null),
    'sexo': new FormControl(null),
    'telefone': new FormControl(null),
    'celular': new FormControl(null),
    'endereco': new FormGroup({
      'rua': new FormControl(null),
      'numero': new FormControl(null),
      'complemento': new FormControl(null),
      'bairro': new FormControl(null),
      'cep': new FormControl(null),
      'cidade': new FormControl(null),
      'uf': new FormControl(null)
    })
  })

  constructor(private bd: Bd, private http: Http) { }

  ngOnInit() {
    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.consultarPerfilUsuario()
    })
  }

  public preencherForm(): void {
    this.formPerfil.patchValue({
      nome: this.perfilUsuario.nome,
      email: this.perfilUsuario.email,
      cpf: this.perfilUsuario.cpf,
      nascimento: this.perfilUsuario.nascimento,
      sexo: this.perfilUsuario.sexo,
      telefone: this.perfilUsuario.telefone,
      celular: this.perfilUsuario.celular,
      endereco: {
        rua: this.perfilUsuario.endereco.rua,
        numero: this.perfilUsuario.endereco.numero,
        complemento: this.perfilUsuario.endereco.complemento,
        bairro: this.perfilUsuario.endereco.bairro,
        cep: this.perfilUsuario.endereco.cep,
        cidade: this.perfilUsuario.endereco.cidade,
        uf: this.perfilUsuario.endereco.uf
      }
    })
  }

  public consultarPerfilUsuario(): void {

    this.bd.consultarUsuario(this.email)
      .then((usuario: any) => {
        if (usuario.nome) this.perfilUsuario.nome = usuario.nome
        if (usuario.email) this.perfilUsuario.email = usuario.email
        if (usuario.cpf) this.perfilUsuario.cpf = usuario.cpf
        if (usuario.nascimento) this.perfilUsuario.nascimento = usuario.nascimento
        if (usuario.sexo) this.perfilUsuario.sexo = usuario.sexo
        if (usuario.telefone) this.perfilUsuario.telefone = usuario.telefone
        if (usuario.celular) this.perfilUsuario.celular = usuario.celular

        if (usuario.endereco) {
          this.perfilUsuario.endereco.rua = usuario.endereco.rua
          this.perfilUsuario.endereco.numero = usuario.endereco.numero
          this.perfilUsuario.endereco.complemento = usuario.endereco.complemento
          this.perfilUsuario.endereco.bairro = usuario.endereco.bairro
          this.perfilUsuario.endereco.cep = usuario.endereco.cep
          this.perfilUsuario.endereco.cidade = usuario.endereco.cidade
          this.perfilUsuario.endereco.uf = usuario.endereco.uf
        }
        // console.log('Usuário: ', usuario)
      })
      .then(() => {
        this.preencherForm()
      })
  }

  public editarPerfil(): void {
    
    let usuario: PerfilUsuario = new PerfilUsuario(
      this.formPerfil.value.nome,
      this.formPerfil.value.email,
      this.formPerfil.value.cpf.replace(/[^\d]/g, ""),
      this.formPerfil.value.nascimento.replace(/[^\d]/g, ""),
      this.formPerfil.value.sexo,
      this.formPerfil.value.telefone,
      this.formPerfil.value.celular,
      this.formPerfil.value.endereco
    )

    // this.bd.editarPerfil(usuario)
    //   .then((feed: any) => {
    //     this.alert(feed.estilo, feed.msg)
    //     this.alerta = feed.msg
    //     this.formPerfil.reset();
    //   })
  }

  public alert(estilo: string, mensagem: string): void {
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      this.alerta = ''
      this.estiloAlerta = ''
    }, 3000)
  }

  public consultaCEP() {

    let cep = this.formPerfil.get('endereco.cep').value

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
    this.formPerfil.patchValue({
      endereco: {
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    })
  }

  public resetaEndereco() {
    this.formPerfil.patchValue({
      endereco: {
        rua: null,
        bairro: null,
        cidade: null,
        uf: null
      }
    })
  }

}
