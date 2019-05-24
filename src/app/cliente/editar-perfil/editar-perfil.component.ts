import { PerfilUsuario } from './../../shared/perfil-usuario.model';
import { Bd } from 'src/app/bd.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators'
import { SessionService } from '../../sessao.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  public id: any

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
      pontReferencia: '',
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
      'pontoReferencia': new FormControl(null),
      'bairro': new FormControl(null),
      'cep': new FormControl(null),
      'cidade': new FormControl(null),
      'uf': new FormControl(null)
    })
  })

  constructor(private bd: Bd,
    private http: Http,
    private sessao: SessionService) { }

  ngOnInit() {
    let id = this.sessao.getSessao()
    this.id = id._id;
    console.log(this.id);
    this.consultarPerfilUsuario()
  }

  preencherForm() {
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
        pontoReferencia: this.perfilUsuario.endereco.pontReferencia,
        bairro: this.perfilUsuario.endereco.bairro,
        cep: this.perfilUsuario.endereco.cep,
        cidade: this.perfilUsuario.endereco.cidade,
        uf: this.perfilUsuario.endereco.uf
      }
    })
  }

  async consultarPerfilUsuario() {
    let usuario = await this.bd.buscarUsuarioID(this.id);
    if (usuario[0].nome) {
      this.perfilUsuario.nome = usuario[0].nome
    }
    if (usuario[0].email) {
      this.perfilUsuario.email = usuario[0].email
    }
    if (usuario[0].cpf) {
      this.perfilUsuario.cpf = usuario[0].cpf
    }
    if (usuario[0].nascimento) {
      this.perfilUsuario.nascimento = usuario[0].nascimento
    }
    if (usuario[0].sexo) {
      this.perfilUsuario.sexo = usuario[0].sexo
    }
    if (usuario[0].telefone) {
      this.perfilUsuario.telefone = usuario[0].telefone
    }
    if (usuario[0].celular) {
      this.perfilUsuario.celular = usuario[0].celular
    }
    if (usuario[0].endereco) {
      this.perfilUsuario.endereco.rua = usuario[0].endereco.rua
      this.perfilUsuario.endereco.numero = usuario[0].endereco.numero
      this.perfilUsuario.endereco.complemento = usuario[0].endereco.complemento
      this.perfilUsuario.endereco.pontReferencia = usuario[0].endereco.pontoReferencia
      this.perfilUsuario.endereco.bairro = usuario[0].endereco.bairro
      this.perfilUsuario.endereco.cep = usuario[0].endereco.cep
      this.perfilUsuario.endereco.cidade = usuario[0].endereco.cidade
      this.perfilUsuario.endereco.uf = usuario[0].endereco.uf
    }
    this.preencherForm();
  }

  async editarPerfil() {
    let endereco = this.formPerfil.get('endereco').value
    endereco.cep = endereco.cep.replace(/[^\d]/g, "")
    let usuario: PerfilUsuario = new PerfilUsuario(
      this.formPerfil.value.nome,
      this.formPerfil.value.email,
      this.formPerfil.value.cpf.replace(/[^\d]/g, ""),
      this.formPerfil.value.nascimento.replace(/[^\d]/g, ""),
      this.formPerfil.value.sexo,
      this.formPerfil.value.telefone,
      this.formPerfil.value.celular,
      endereco
    )
    let resp = await this.bd.incluirDadosPerfil(this.id, usuario);
    let feedback = resp.json()
    this.alert(feedback.style, feedback.msg)
    this.alerta = feedback.msg
    this.formPerfil.reset();
  }

  public alert(estilo: string, mensagem: string): void {
    this.alerta = mensagem
    this.estiloAlerta = estilo
    setTimeout(() => {
      this.alerta = ''
      this.estiloAlerta = ''
      this.consultarPerfilUsuario()
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
