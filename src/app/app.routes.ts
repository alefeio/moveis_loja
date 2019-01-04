import { AutenticacaoGuard } from './autenticacao-guard.service';
import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { QuartoComponent } from './quarto/quarto.component'
import { SalaComponent } from './sala/sala.component'
import { OfertaComponent } from './oferta/oferta.component'
import { DetalhesComponent } from './oferta/detalhes/detalhes.component';
import { ContatoComponent } from './contato/contato.component';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { ClienteComponent } from './cliente/cliente.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'quarto', component: QuartoComponent },
    { path: 'sala', component: SalaComponent },
    { path: 'oferta', component: HomeComponent },
    { path: 'oferta/:id', component: OfertaComponent, 
        children: [
            { path: '', component: DetalhesComponent },
            { path: 'detalhes', component: DetalhesComponent },
            { path: 'contato', component: ContatoComponent }
        ] 
    },
    { path: 'contato', component: ContatoComponent },
    { path: 'ordem-compra', component: OrdemCompraComponent },
    { path: 'acesso', component: AcessoComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'cadastro', component: CadastroComponent }
        ]
    },
    { path: 'cliente', component: ClienteComponent, canActivate: [ AutenticacaoGuard ] }
]