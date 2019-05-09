import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Bd } from './../bd.service';
import { CarrinhoService } from '../carrinho.service'
declare var $: any

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit, OnDestroy {

  public oferta: any = ''
  public key: string
  imgs: any = []
  imagem: any = ''
  cores: any;
  codigos: any = [];
  imagemCor: any;
  corEscolhida: Number;
  valor: Number;
  ofertaCarrinho: any

  constructor(
    private bd: Bd,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService
  ) {
    $(document).ready(function () {
      $('html,body').scrollTop(0);
      $('.zoom')
        .on('mouseover', function () {
          $(this).children('.img-zoom').css({ 'transform': 'scale(2.5)' });
        })
        .on('mouseout', function () {
          $(this).children('.img-zoom').css({ 'transform': 'scale(1)' });
        })
        .on('mousemove', function (i) {
          $(this).children('.img-zoom').css({ 'transform-origin': ((i.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((i.pageY - $(this).offset().top) / $(this).height()) * 100 + '%' });
        })
    })
  }

  ngOnInit() {
    this.route.params.subscribe((parametros: any) => {
      this.key = parametros.id
      this.bd.buscarProdutoID(this.key).then(resp => {
        this.oferta = resp
        this.oferta.key = this.key;
        let cores = resp.cores
        this.cores = cores;
        let arrayCores: Array<any> = []
        for (let i of cores) {
          if (i.destaque === true) {
            this.imagemCor = i.imagem
            this.corEscolhida = i
            this.valor = i.valor
            for (let img of i.imagem) {
              if (img.destaque === true) {
                this.imagem = img
              }
            }
          }
          arrayCores.push(i.codigos);
        }
        this.coresNew(arrayCores)
      });
    })
  }

  agoraVai() {
    $('.zoom').zoom()
  }

  ngOnDestroy() {
  }

  imgHover(i) {
    let index = i.toString()
    for (let indice in this.imagemCor) {
      if (index === indice) {
        this.imagem = this.imagemCor[indice];
      }
    };
  }

  mostrarImg(i) {
    let indice = i.toString()
    let imagens: any = []
    for (let index in this.cores) {
      if (index === indice) {
        this.valor = this.cores[index].valor;
        imagens.push(this.cores[index])
        this.corEscolhida = this.cores[index]
      }
    }
    for (let a of imagens) {
      this.imagemCor = a.imagem
    }
    this.imagem = this.imagemCor[0]
  }

  imgCor(i) {
    let ind = i.toString()
    let corTumb: any
    for (let r in this.imagemCor) {
      if (ind === r) {
        corTumb = this.imagemCor[r]
      }
    }
    this.imagem = corTumb
  }

  coresNew(arrayCores) {
    let cod: Array<any> = []
    let item: Array<any> = []
    for (let a of arrayCores) {
      item.push(a)
      for (let i of item) {
        let qtdCor: Array<any> = i
        switch (qtdCor.length) {
          case 1: {
            a.style = '30px'
            break
          }
          case 2: {
            a.style = '15px'
            break
          }
          case 3: {
            a.style = '10px'
            break
          }
          case 4: {
            a.style = '7.5px'
            break
          }
          case 5: {
            a.style = '6px'
            break
          }
        }
      }
      cod.push(a)
    }
    this.codigos = cod
  }

  public adicionarItemCarrinho(): void {
    let ofertaCarrinho = {
      criado: this.oferta.criado,
      descricao: this.oferta.descricao,
      key: this.oferta.key,
      linha: this.oferta.linha,
      marca: this.oferta.marca,
      nome: this.oferta.nome,
      produtoBase: this.oferta.produtoBase,
      status: this.oferta.status,
      ambiente: this.oferta.ambiente,
      cor: this.corEscolhida
    }

    this.ofertaCarrinho = ofertaCarrinho;
    // var sugestao = Math.ceil(Math.random());
    console.log();
    // this.carrinhoService.incluirItem(ofertaCarrinho);
  }

  @ViewChild('scrollHorizontal', { read: ElementRef }) public widgetsThumbnails: ElementRef;
  scrollEsquerda() {
    this.widgetsThumbnails.nativeElement.scrollTo({
      left: (this.widgetsThumbnails.nativeElement.scrollLeft + -100), behavior: 'smooth'
    });
  }
  scrollDireita() {
    this.widgetsThumbnails.nativeElement.scrollTo({
      left: (this.widgetsThumbnails.nativeElement.scrollLeft + 100), behavior: 'smooth'
    });
  }
}