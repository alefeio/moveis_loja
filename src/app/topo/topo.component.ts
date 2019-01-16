import { Bd } from './../bd.service';
import { Autenticacao } from './../autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from './../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Oferta } from '../shared/oferta.model'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  private subjectPesquisa: Subject<string> = new Subject<string>()
  public ambientes: Array<any> = []
  public linhas: Array<any> = []

  public ambiente: string

  constructor(
    private ofertasService: OfertasService,
    private autenticacao: Autenticacao,
    private bd: Bd
  ) { }

  ngOnInit() {

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
    console.log('Termo da busca: ',termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }

  public sair(): void {
    this.autenticacao.sair()
  }

  public consultarAmbientes(): void {
    this.bd.consultarAmbientes()
      .then((ambientes: any) => {
        this.ambiente = ambientes.nome
        this.ambientes = ambientes.reverse()

        // this.bd.consultarLinhasPorAmbiente(this.ambiente)
        //   .then((linhas: any) => {
        //     this.linhas = linhas
        //   })

        this.consultarLinhas()

      })
  }

  public consultarLinhas(): void {
    this.bd.consultarLinhas()
      .then((linhas: any) => {
        this.linhas = linhas
      })
  }

}
