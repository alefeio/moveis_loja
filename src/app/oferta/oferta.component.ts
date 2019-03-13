import { Bd } from './../bd.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
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
  larguraCor: string

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

    // this.route.params.subscribe((parametros: Params) => {
    //   this.key = parametros.id
    //   console.log('Essa é a Key: ', this.key)   
    //   this.bd.consultarProdutosPorId(parametros.id)
    //     .then((produto: any) => {
    //       this.oferta = produto
    //       console.log('Essa é a oferta: ', this.oferta)
    //       this.complemento = this.oferta.complementos
    //       console.log(this.complemento);
    //     })
    // })
    this.route.params.subscribe((parametros: any) => {
      this.key = parametros.id
      this.bd.buscarProdutoID(this.key).then(resp => {
        this.oferta = resp
        let cores = resp.cores
        this.cores = cores;
        let arrayCores: Array<any> = []
        for (let i of cores) {
          let imagens = i.imagem
          arrayCores.push(i.codigos);
          for (let t of imagens) {
            this.imgs.push(t);
          }
        }
        this.imagem = this.imgs[0];
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
    for (let indice in this.imgs) {
      if (index === indice) {
        this.imagem = this.imgs[indice];
      }
    }
  }

  mostrarImg(i) {
    let indice = i.toString()
    let imagens: any = []
    for (let index in this.cores) {
      if (index === indice) {
        imagens.push(this.cores[index])
      }
    }
    for (let a of imagens) {
      let arrayImagem = a.imagem
      this.imagemCor = arrayImagem
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

  sair() {
    this.imagemCor = undefined;
    this.imagem = this.imgs[0]
  }

  coresNew(arrayCores) {
    let cod: Array<any> = []
    let item: Array<any> = [] 
    for (let a of arrayCores) {
      item.push(a)
      for (let i of item) {
        let qtdCor: Array<any> = i
        switch(qtdCor.length){
          case 1:{
            a.style = '30px'
            break
          }
          case 2:{
            a.style = '15px'
            break
          }
          case 3:{
            a.style = '10px'
            break
          }
          case 4:{
            a.style = '7.5px'
            break
          }
          case 5:{
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
    this.carrinhoService.incluirItem(this.oferta)
  }
}