import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../../shared/usuario.model'
import { Autenticacao } from 'src/app/autenticacao.service';
declare var $: any

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

  msg: string;
  class: string;

  constructor(private autenticacao: Autenticacao) {
  }

  ngOnInit() {

  }

  async verificarCPF(cpf) {
    let cpfCadastro = cpf.replace(/[^\d]/g, "");
    let usuario = await this.autenticacao.virificarUsuario();
    let cpfUsuario: Array<any> = [];
    let cpfJaCadastrado
    usuario.forEach((resposta) => {
      let cpfJaCadastrado = resposta.val()
      cpfUsuario.push(cpfJaCadastrado.cpf);
    })
    for (let verificar of cpfUsuario) {
      if (cpfCadastro === verificar) {
        cpfJaCadastrado = verificar;
      }
    }
    if (cpfCadastro === cpfJaCadastrado) {
      this.msg = "Este CPF ja existe!";
    } if(cpfCadastro != cpfJaCadastrado && cpfCadastro != "") {
      this.msg = "CPF valido!"
    }
  }


  async validarEmail(email) {
    let emailExiste = await this.autenticacao.virificarUsuario();
    let emails:Array<any> = [];
    let emailJaExiste;
    emailExiste.forEach((resposta)=>{
      let emailUsuario = resposta.val()
      emails.push(emailUsuario.email);
    })
    for(let verificar of emails){
      if(email === verificar){
        emailJaExiste = verificar;
      }
    }
    if(email === emailJaExiste){
      this.msg = "Este E-mail ja existe!";
    }
    if(email != emailJaExiste && email != ""){
      this.msg = "E-mail valido!"
    }
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void {

    let usuario: Usuario = new Usuario(
      this.formCadastro.value.nome,
      this.formCadastro.value.email,
      this.formCadastro.value.cpf.replace(/[^\d]/g, ""),
      this.formCadastro.value.nascimento.replace(/[^\d]/g, ""),
      this.formCadastro.value.sexo,
      this.formCadastro.value.senha
    )
    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => {
        if (this.autenticacao.msgErro === undefined) {
          this.autenticacao.autenticar(this.formCadastro.value.email, this.formCadastro.value.senha)
          $('#modal-login').modal('hide');
          this.formCadastro.reset();
          this.exibirPainelLogin();
        }
      })
      .catch((erro: Error) => console.log(this.autenticacao.msgErro))
  }
}
