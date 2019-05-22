import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

    logado = false;
    usuario: any;

    constructor(
        private router: Router
    ) { }

    alteraEmpresa(empresa) {

        let sessao = JSON.parse(localStorage.getItem('sessao'));
        //sessao.empresa = empresa;
        localStorage.setItem('sessao', JSON.stringify(sessao));
        this.usuario.empresa = empresa;
        window.location.reload();
        this.router.navigate(['/inicio']);
    }

    salvar(sessao) {
        console.log(sessao)
        localStorage.setItem('sessao', JSON.stringify(sessao));
        this.carrega();
    }

    logoff() {
        this.logado = false;
        this.usuario = null;
        localStorage.removeItem('sessao');
        this.router.navigate(['/login']);
    }

    forceLogin() {
        this.logoff();
        this.router.navigate(['/login']);
    }

    carrega() {
        let sessao = localStorage.getItem('sessao');
        if (sessao) {
            this.logado = true;
            this.usuario = JSON.parse(sessao);
        } else {
            this.logoff();
        }
    }

    getSessao() {
        return JSON.parse(localStorage.getItem('sessao'));
    }

}