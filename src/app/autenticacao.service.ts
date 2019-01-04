import { Usuario } from "./shared/usuario.model";
import * as backend from 'firebase'
import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class Autenticacao implements OnDestroy {

    constructor(private router: Router){}

    public token_id: string
    public msgErro: string

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos ao serviço de usuario: ', usuario)

        // criando usuário utilizando email e senha
        return backend.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                this.msgErro = undefined
                // remover a senha do objeto usuario
                delete usuario.senha
                
                // registrando dados complementares do usuario no path email na base64
                backend.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)   

            })
            .catch((erro: Error) => {
                this.msgErro = erro.message
            }) 
    }

    public autenticar(email: string, senha: string): void{
        
        backend.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta) => {
                this.msgErro = undefined
                backend.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', this.token_id)
                        this.router.navigate(['/cliente'])
                    })
            })
            .catch((erro: Error) => {
                this.msgErro = erro.message
            })

    }

    public autenticado(): boolean {
        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined) {
            this.router.navigate(['/home'])
        }

        return this.token_id !== undefined
    }

    

    public sair(): void {
        backend.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
            })
    }

    ngOnDestroy(){
        this.msgErro = undefined
    }

}