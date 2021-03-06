import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
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

  // public ofertas: Oferta[]
  public destaques: any
  public ambientes: Array<any> = []
  public pQuarto: Array<any> = []
  public pSala: Array<any> = []
  public pCozinha: Array<any> = []
  public pDiversos: Array<any> = []
  produtosGestao: Array<any> = [];

  constructor(private ofertasService: OfertasService,
    private bd: Bd,
    private router: Router) { }

  async ngOnInit() {
    $('html,body').scrollTop(0);
    //this.ofertas = this.ofertasService.getOfertas()
    //console.log(this.ofertas)

    // this.consultarAmbientes()

    // this.consultarProdutos()

    this.produtosEcommerce()

    // this.ofertasService.getOfertas()
    //   .then((ofertas: Oferta[]) => {
    //     this.ofertas = ofertas

    //   })
    //   .catch((param: any) => {
    //     // console.log(param)

    //   })

    // this.bd.consultarProdutosPorFiltroComLimite('ambiente', 'Quarto', 3)
    //   .then((produtos: any) => {
    //     this.pQuarto = produtos
    //     // console.log(this.pQuarto)
    //   })

    // this.bd.consultarProdutosPorFiltro('ambiente', 'Sala')
    //   .then((produtos: any) => {
    //     this.pSala = produtos
    //   })

    // this.bd.consultarProdutosPorFiltro('ambiente', 'Cozinha')
    //   .then((produtos: any) => {
    //     this.pCozinha = produtos
    //   })

    // this.bd.consultarProdutosPorFiltro('ambiente', 'Diversos')
    //   .then((produtos: any) => {
    //     this.pDiversos = produtos
    //   })
  }

  produtosEcommerce() {
    this.bd.buscarProdutosEcommerce().then((resp: any) => {
      console.log('resp:', resp)
      // this.produtosGestao = resp
      let salaDestaque
      let quartoDestaque
      let cozinhaDestaque
      let diversosDestaque
      for (let prod of resp) {
        if (prod.ambienteDescricao === "Sala") {
          salaDestaque = prod
          for (let cores of prod.cores) {
            if (cores.destaque === true) {
              salaDestaque.cores = cores;
              for (let imagem of cores.imagem) {
                if (imagem.destaque === true) {
                  salaDestaque.cores.imagem = imagem;
                }
              }
            }
          }
          this.pSala.push(salaDestaque);
        }
        if (prod.ambienteDescricao === "Quarto") {
          quartoDestaque = prod
          for (let cores of prod.cores) {
            if (cores.destaque === true) {
              quartoDestaque.cores = cores;
              for (let imagem of cores.imagem) {
                if (imagem.destaque === true) {
                  quartoDestaque.cores.imagem = imagem;
                }
              }
            }
          }
          this.pQuarto.push(quartoDestaque);
        }
        if (prod.ambienteDescricao === "Cozinha") {
          cozinhaDestaque = prod
          for (let cores of prod.cores) {
            if (cores.destaque === true) {
              cozinhaDestaque.cores = cores;
              for (let imagem of cores.imagem) {
                if (imagem.destaque === true) {
                  cozinhaDestaque.cores.imagem = imagem;
                }
              }
            }
          }
          this.pCozinha.push(cozinhaDestaque);
        }
        if (prod.ambienteDescricao === "Diversos") {
          diversosDestaque = prod
          for (let cores of prod.cores) {
            if (cores.destaque === true) {
              diversosDestaque.cores = cores;
              for (let imagem of cores.imagem) {
                if (imagem.destaque === true) {
                  diversosDestaque.cores.imagem = imagem;
                }
              }
            }
          }
          this.pDiversos.push(diversosDestaque);
        }
      }
    })
  }

  ofertaDetalhe(chaveProduto) {
    this.router.navigate(['/oferta', chaveProduto]);
  }

  @ViewChild('scrollHorizontalSala', { read: ElementRef }) public widgetsContentSala: ElementRef;

  @ViewChild('scrollHorizontalQuarto', { read: ElementRef }) public widgetsContentQuarto: ElementRef;

  @ViewChild('scrollHorizontalCozinha', { read: ElementRef }) public widgetsContentCozinha: ElementRef;

  @ViewChild('scrollHorizontalDiversos', { read: ElementRef }) public widgetsContentDiversos: ElementRef;

  @ViewChild('scrollHorizontalDestaques', { read: ElementRef }) public widgetsContentDestaques: ElementRef;

  public scrollDireita(ambiente: string): void {
    if (ambiente === 'Sala') {
      // console.log(ambiente)
      this.widgetsContentSala.nativeElement.scrollTo({ left: (this.widgetsContentSala.nativeElement.scrollLeft + 320), behavior: 'smooth' });
    }

    if (ambiente == 'Quarto') {
      // console.log(ambiente)
      this.widgetsContentQuarto.nativeElement.scrollTo({ left: (this.widgetsContentQuarto.nativeElement.scrollLeft + 320), behavior: 'smooth' });
    }

    if (ambiente === 'Cozinha') {
      // console.log(ambiente)
      this.widgetsContentCozinha.nativeElement.scrollTo({ left: (this.widgetsContentCozinha.nativeElement.scrollLeft + 320), behavior: 'smooth' });
    }

    if (ambiente === 'Diversos') {
      // console.log(ambiente)
      this.widgetsContentDiversos.nativeElement.scrollTo({ left: (this.widgetsContentDiversos.nativeElement.scrollLeft + 320), behavior: 'smooth' });
    }

    if (ambiente === 'Destaques') {
      // console.log(ambiente)
      this.widgetsContentDestaques.nativeElement.scrollTo({ left: (this.widgetsContentDestaques.nativeElement.scrollLeft + 320), behavior: 'smooth' });
    }
  }

  public scrollEsquerda(ambiente: string): void {
    if (ambiente === 'Sala') this.widgetsContentSala.nativeElement.scrollTo({ left: (this.widgetsContentSala.nativeElement.scrollLeft - 320), behavior: 'smooth' });

    if (ambiente === 'Quarto') this.widgetsContentQuarto.nativeElement.scrollTo({ left: (this.widgetsContentQuarto.nativeElement.scrollLeft - 320), behavior: 'smooth' });

    if (ambiente === 'Cozinha') this.widgetsContentCozinha.nativeElement.scrollTo({ left: (this.widgetsContentCozinha.nativeElement.scrollLeft - 320), behavior: 'smooth' });

    if (ambiente === 'Diversos') this.widgetsContentDiversos.nativeElement.scrollTo({ left: (this.widgetsContentDiversos.nativeElement.scrollLeft - 320), behavior: 'smooth' });

    if (ambiente === 'Destaques') this.widgetsContentDestaques.nativeElement.scrollTo({ left: (this.widgetsContentDestaques.nativeElement.scrollLeft - 320), behavior: 'smooth' });
  }
}