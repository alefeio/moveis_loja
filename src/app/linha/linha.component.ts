import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-linha',
  templateUrl: './linha.component.html',
  styleUrls: ['./linha.component.css']
})
export class LinhaComponent implements OnInit {

  public produtos: any
  public linha: string

  constructor(
    private bd: Bd,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {

      this.linha = parametros.param

      this.bd.consultarProdutosPorFiltro('linha', this.linha)
        .then((produtos: any) => {
          this.produtos = produtos
        })
    })
    
  }

  public consultarProdutosPorFiltro() {
    this.bd.consultarProdutosPorFiltro('linha', this.linha)
      .then((produtos: any) => {
        this.produtos = produtos
      })
  }

}
