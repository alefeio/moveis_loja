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
  cpfValidoReceita: boolean;
  emailValido: boolean;

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
    this.validarCPF(cpfCadastro);
    if (cpfCadastro === cpfJaCadastrado) {
      this.msg = "Este CPF ja existe!";
    } 
    if (cpfCadastro != cpfJaCadastrado && cpfCadastro != "" && this.cpfValidoReceita === true) {
      this.msg = "CPF valido!"
    }
    if (this.cpfValidoReceita === false) {
      this.msg = "CPF Inválido!"
    }
  }

  validarCPF(cpfCadastro) {
    let cpf = cpfCadastro.replace(/[^\d]+/g, '');
    if (cpf == '') return this.cpfValidoReceita = false;
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
      return this.cpfValidoReceita = false;
    // Valida 1o digito	
    let add = 0;
    for (let i = 0; i < 9; i++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
      return this.cpfValidoReceita = false;
    // Valida 2o digito	
    add = 0;
    for (let i = 0; i < 10; i++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return this.cpfValidoReceita = false;
    return this.cpfValidoReceita = true;
  }


  async validarEmail(email) {
    let emailExiste = await this.autenticacao.virificarUsuario();
    let emails: Array<any> = [];
    let emailJaExiste;
    emailExiste.forEach((resposta) => {
      let emailUsuario = resposta.val()
      emails.push(emailUsuario.email);
    })
    for (let verificar of emails) {
      if (email === verificar) {
        emailJaExiste = verificar;
      }
    }
    this.validaEmail(email)
    if (email === emailJaExiste) {
      this.msg = "Este E-mail ja existe!";
    }
    if (email != emailJaExiste && email != "") {
      this.msg = "E-mail valido!"
    }
    if(this.emailValido === false) {
      this.msg = "E-mail inválido!"
    }
  }

  validaEmail(email) {
    var str = email;
    var filtro = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filtro.test(str)) {
      return this.emailValido = true;
    } else {
      return this.emailValido = false;
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
