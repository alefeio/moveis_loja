import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.css']
})
export class AmbienteComponent implements OnInit {

  public produtos: any
  public ambiente: string
  public linhas: Array<any> = []

  constructor(
    private bd: Bd,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe((parametros: Params) => {

      this.ambiente = parametros.param

      this.consultarProdutosPorFiltro()
      this.consultarLinhasPorAmbiente()

    })

  }

  public consultarProdutosPorFiltro() {
    this.bd.consultarProdutosPorFiltro('ambiente', this.ambiente)
      .then((produtos: any) => {
        this.produtos = produtos
      })
  }

  public consultarLinhasPorAmbiente() {
    this.bd.consultarLinhasPorAmbiente(this.ambiente)
      .then((linhas: any) => {
        console.log(linhas)
        this.linhas = linhas
        console.log(this.linhas)
      })
  }

}
