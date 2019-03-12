import { LinhaComponent } from './linha/linha.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { AdminComponent } from './admin/admin.component';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { QuartoComponent } from './quarto/quarto.component'
import { SalaComponent } from './sala/sala.component'
import { OfertaComponent } from './oferta/oferta.component'
import { ContatoComponent } from './contato/contato.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { DiversosComponent } from './diversos/diversos.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'quarto', component: QuartoComponent },
    { path: 'sala', component: SalaComponent },
    { path: 'cozinha', component: CozinhaComponent },
    { path: 'diversos', component: DiversosComponent },
    { path: 'ambiente/:param', component: AmbienteComponent },
    { path: 'linha/:param', component: LinhaComponent },
    { path: 'oferta', component: HomeComponent },
    { path: 'oferta/:id', component: OfertaComponent },
    { path: 'contato', component: ContatoComponent },
    { path: 'ordem-compra', component: OrdemCompraComponent },
    { path: 'acesso', component: AcessoComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'cadastro', component: CadastroComponent }
        ]
    },
    { path: 'cliente', component: ClienteComponent, canActivate: [ AutenticacaoGuard ] },
    { path: 'admin', component: AdminComponent, canActivate: [ AutenticacaoGuard ] }
]