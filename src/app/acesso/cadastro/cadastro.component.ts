import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../shared/usuario.model'
import { Autenticacao } from 'src/app/autenticacao.service';
declare var $:any

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formCadastro: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required]),
    'email': new FormControl(null, [Validators.required, Validators.email]),
    'cpf': new FormControl(null, [Validators.required]),
    'nascimento': new FormControl(null, [Validators.required]),
    'sexo': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {

  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {

    let usuario: Usuario = new Usuario(
      this.formCadastro.value.nome,
      this.formCadastro.value.email,
      this.formCadastro.value.cpf,
      this.formCadastro.value.nascimento,
      this.formCadastro.value.sexo,
      this.formCadastro.value.senha
    )

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => {
        this.autenticacao.autenticar(this.formCadastro.value.email, this.formCadastro.value.senha)
      $('#modal-login').modal('hide');

      })
      .catch((erro: Error) => console.log(erro))
  }

}
