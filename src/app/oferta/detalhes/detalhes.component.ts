import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css'],
  providers: [ OfertasService ]
})
export class DetalhesComponent implements OnInit {

  public altura: number
  public largura: number
  public profundidade: number
  public descricao: string

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      this.ofertasService.getDetalhesOferta(parametros.id)
        .then((resposta: any) => {
          this.altura = resposta.altura
          this.largura = resposta.largura
          this.profundidade = resposta.profundidade
          this.descricao = resposta.descricao
        })
    })
  }

}
