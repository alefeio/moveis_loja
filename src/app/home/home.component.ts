import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OfertasService } from '../ofertas.service'
import { Oferta } from '../shared/oferta.model'
import { Bd } from 'src/app/bd.service';

declare var $: any

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[]
  public destaques: any
  public ambientes: Array<any> = []

  public pQuarto: Array<any> = []
  public pSala: Array<any> = []
  public pCozinha: Array<any> = []
  public pDiversos: Array<any> = []

  constructor(private ofertasService: OfertasService, private bd: Bd) { }

  ngOnInit() {
    //this.ofertas = this.ofertasService.getOfertas()
    //console.log(this.ofertas)

    this.consultarAmbientes()

    this.consultarProdutos()

    this.ofertasService.getOfertas()
      .then((ofertas: Oferta[]) => {
        this.ofertas = ofertas

      })
      .catch((param: any) => {
        console.log(param)

      })

    this.bd.consultarProdutosPorFiltroComLimite('ambiente', 'Quarto', 3)
      .then((produtos: any) => {
        this.pQuarto = produtos
        console.log(this.pQuarto)
      })

    this.bd.consultarProdutosPorFiltro('ambiente', 'Sala')
      .then((produtos: any) => {
        this.pSala = produtos
      })

    this.bd.consultarProdutosPorFiltro('ambiente', 'Cozinha')
      .then((produtos: any) => {
        this.pCozinha = produtos
      })

    this.bd.consultarProdutosPorFiltro('ambiente', 'Diversos')
      .then((produtos: any) => {
        this.pDiversos = produtos
      })
  }

  public consultarProdutos(): void {
    this.bd.consultarDestaques()
      .then((produtos: any) => {
        this.destaques = produtos
        // console.log(this.destaques)
      })
  }

  public consultarAmbientes(): void {
    this.bd.consultarAmbientes()
      .then((ambientes: any) => {
        this.ambientes = ambientes.reverse()
      })
  }

  // public scroll(direcao, ambiente){
  //   let direc = direcao
  //   let amb = ambiente
  // }

  // @ViewChild('scrollHorizontalDiversos', { read: ElementRef }) public widgetsContentDiversos: ElementRef;

  // public scrollDireita(): void {
  //   this.widgetsContentDiversos.nativeElement.scrollTo({ left: (this.widgetsContentDiversos.nativeElement.scrollLeft + 320), behavior: 'smooth' });
  // }

  // public scrollEsquerdaDiversos(): void {
  //   this.widgetsContentDiversos.nativeElement.scrollTo({ left: (this.widgetsContentDiversos.nativeElement.scrollLeft - 320), behavior: 'smooth' });
  // }

}
