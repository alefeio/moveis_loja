import { Bd } from './../bd.service';
import { Autenticacao } from './../autenticacao.service';
import { Component, OnInit, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { OfertasService } from './../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Oferta } from '../shared/oferta.model';
import { SessionService } from '../sessao.service';
declare var $: any

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()
  public ambientes: Array<any> = []
  public linhas: Array<any> = []
  scrolNumber: number = 0;

  public ambiente:string
  sticky: boolean = false;

  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao,
    private bd: Bd,
    public sessao: SessionService
  ) {
    let that = this;
    window.onscroll = function () {
      var top = window.pageYOffset || document.documentElement.scrollTop
      that.scrolNumber = top;
    }
    $(document).ready(function () {
      $('#nav-icon1').click(function () {
        $(this).toggleClass('open');
      });
    });
  }

  public painelLogin(): void {
    this.exibirPainel.emit('login')
  }

  ngOnInit() {
    // if (localStorage.getItem('sessao')) {
    //   this.autenticacao.token_id = localStorage.getItem('sessao');
    // }
    this.consultarAmbientes()
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => {
          if (termo.trim() === '') {
            return of<Oferta[]>([])
          }
          return this.bd.pesquisarOfertas(termo)
        })
      )
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
    // console.log('Termo da busca: ', termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

  sair() {
    // this.autenticacao.sair()
    this.sessao.logoff();
  }

  consultarAmbientes(){
    this.bd.buscarAmbientes().then((resp:any)=>{
      this.ambientes = resp;
    });
    // this.bd.consultarAmbientes()
    //   .then((ambientes: any) => {
    //     this.ambiente = ambientes.nome
    //     this.ambientes = ambientes.reverse()

    //     this.bd.consultarLinhasPorAmbiente(this.ambiente)
    //       .then((linhas: any) => {
    //         this.linhas = linhas
    //         // console.log(linhas);
    //       })
    this.consultarLinhas();
    //   })
  }

  consultarLinhas(){
    this.bd.buscarLinhas().then((resp:any)=>{
      this.linhas = resp;
    })
    // this.bd.consultarLinhas()
    //   .then((linhas: any) => {
    //     this.linhas = linhas
    //     // console.log(linhas);
    //   })
  }

  mostrarLogin() {
    $('#modal-login').modal('show');
  }
}
