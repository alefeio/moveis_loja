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
import { DetalhesComponent } from './oferta/detalhes/detalhes.component';
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

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    QuartoComponent,
    SalaComponent,
    OfertaComponent,
    DetalhesComponent,
    ContatoComponent,
    DescricaoReduzida,
    OrdemCompraComponent,
    OrdemCompraSucessoComponent,
    AcessoComponent,
    LoginComponent,
    CadastroComponent,
    ClienteComponent
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
    AutenticacaoGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
