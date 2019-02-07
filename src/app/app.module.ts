import { Util } from './util.service';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
// import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { QuartoComponent } from './quarto/quarto.component';
import { SalaComponent } from './sala/sala.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ContatoComponent } from './contato/contato.component';
import { registerLocaleData } from "@angular/common";
import localePt from "@angular/common/locales/pt";
registerLocaleData(localePt);

import { CarrinhoService } from './carrinho.service'

import { DescricaoReduzida } from './util/descricao-reduzida.pipe';
import { OrdemCompraComponent } from './ordem-compra/ordem-compra.component';
import { OrdemCompraSucessoComponent } from './ordem-compra-sucesso/ordem-compra-sucesso.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { Autenticacao } from './autenticacao.service';
import { ClienteComponent } from './cliente/cliente.component';
import { CozinhaComponent } from './cozinha/cozinha.component';
import { DiversosComponent } from './diversos/diversos.component';
import { AdicionarChamadoComponent } from './cliente/adicionar-chamado/adicionar-chamado.component';
import { Bd } from './bd.service';
import { Progresso } from './progresso.service';
import { ChamadosComponent } from './cliente/chamados/chamados.component';
import { EditarPerfilComponent } from './cliente/editar-perfil/editar-perfil.component';
import { AdminComponent } from './admin/admin.component';
import { ProdutosComponent } from './admin/produtos/produtos.component';
import { AdicionarProdutoComponent } from './admin/adicionar-produto/adicionar-produto.component';
import { AmbienteComponent } from './ambiente/ambiente.component';
import { LinhaComponent } from './linha/linha.component';
import { AmbientesComponent } from './admin/ambientes/ambientes.component';
import { LinhasComponent } from './admin/linhas/linhas.component';
import { AdicionarAmbienteComponent } from './admin/adicionar-ambiente/adicionar-ambiente.component';
import { AdicionarLinhaComponent } from './admin/adicionar-linha/adicionar-linha.component';
import { PedidosComponent } from './cliente/pedidos/pedidos.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { RecuperarSenhaComponent } from './acesso/recuperar-senha/recuperar-senha.component';
import { RodaPeComponent } from './roda-pe/roda-pe.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    QuartoComponent,
    SalaComponent,
    OfertaComponent,
    ContatoComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent,
    ClienteComponent,
    CozinhaComponent,
    DiversosComponent,
    AdicionarChamadoComponent,
    ChamadosComponent,
    EditarPerfilComponent,
    AdminComponent,
    ProdutosComponent,
    AdicionarProdutoComponent,
    AmbienteComponent,
    LinhaComponent,
    AmbientesComponent,
    LinhasComponent,
    AdicionarAmbienteComponent,
    AdicionarLinhaComponent,
    PedidosComponent,
    CarrouselComponent,
    RecuperarSenhaComponent,
    RodaPeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    // FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-Br' }, 
    CarrinhoService, 
    Autenticacao,
    AutenticacaoGuard,
    Bd,
    Progresso,
    Util
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
