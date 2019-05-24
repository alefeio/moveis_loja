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
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { DiversosComponent } from './diversos/diversos.component';
import { CarrinhoCompraComponent } from './ordem-compra/carrinho-compra/carrinho-compra.component';
import { DadosAdicionaisComponent } from './ordem-compra/dados-adicionais/dados-adicionais.component';
import { PagamentoComponent } from './ordem-compra/pagamento/pagamento.component'
import { SessionService } from './sessao.service';

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
    {
        path: 'ordem-compra', component: OrdemCompraComponent,
        children: [
            { path: '', redirectTo: 'carrinho', pathMatch: 'full' },
            { path: 'carrinho', component: CarrinhoCompraComponent },
            { path: 'dados-adicionais', component: DadosAdicionaisComponent},
            { path: 'pagamento', component: PagamentoComponent}
        ]
    },
    {
        path: 'acesso', component: AcessoComponent,
        children: [
            { path: '', component: LoginComponent },
            { path: 'login', component: LoginComponent },
            { path: 'cadastro', component: CadastroComponent }
        ]
    },
    { path: 'cliente', component: ClienteComponent, canActivate: [SessionService] },
    { path: 'cliente/editar-perfil', component: EditarPerfilComponent, canActivate: [SessionService] },
    { path: 'admin', component: AdminComponent, canActivate: [SessionService] }
]