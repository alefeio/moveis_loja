import { Autenticacao } from './../../autenticacao.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SessionService } from '../../sessao.service';

declare var $: any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public form: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.required])
  })

  msgErro: string = undefined

  constructor(private autenticacao: Autenticacao,
    private sessao: SessionService) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro')
  }

  public exibirPainelRecupSenha(): void {
    this.exibirPainel.emit('recupSenha')
  }

  async existe(emailDigitado){
    let resp = await this.autenticacao.verificarUsuarioPorEmail(emailDigitado)
    if(resp.length === 0){
      this.msgErro = 'Você Precisa se cadastrar para fazer o login!'
      setTimeout(()=>{
        this.exibirPainel.emit('cadastro');
      }, 3000)
    }
  }

  // autenticacao de usuario com email e senha
  autenticar() {
    this.autenticacao.autenticarUsuario(this.form.value).then(resp => {
      this.sessao.salvar(resp.json());
      $('#modal-login').modal('hide');
    }).catch(error => {
      this.msgErro = error._body;
      setTimeout(() => {
        this.msgErro = undefined;
      }, 5000);
    })
  }
}
