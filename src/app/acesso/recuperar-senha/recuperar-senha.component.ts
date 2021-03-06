import { Autenticacao } from './../../autenticacao.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $:any

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  msgErro:string

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required])
  })

  constructor(public autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login')
  }

  // autenticacao de usuario com email e senha
  // public autenticar(): void {
  //   this.autenticacao.autenticar(this.form.value.email, this.form.value.senha)
  // }

  recuperarSenha(email: string) {
    this.autenticacao.recupSenha(email);
    this.autenticacao.msgErro;
    setTimeout(()=>{
      this.autenticacao.msgErro = "";
      this.autenticacao.class = "";
      $('#modal-login').modal('hide');
    }, 5000);
  }
}
