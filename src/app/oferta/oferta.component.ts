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

  cores:any = [
    '#fff',
    '#000',
    '#0000ff'
  ]

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
    console.log(this.cores);

    this.route.params.subscribe((parametros: Params) => {

      this.key = parametros.id
      console.log('Essa é a Key: ', this.key)

      this.bd.consultarProdutosPorId(parametros.id)
        .then((produto: any) => {
          this.oferta = produto
          console.log('Essa é a oferta: ', this.oferta)
        })
    })
  }

  ngOnDestroy() {
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
  }

}
