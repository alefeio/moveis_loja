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

  constructor(
    private bd: Bd,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {

      this.ambiente = parametros.param

      this.bd.consultarProdutosPorFiltro('ambiente', this.ambiente)
        .then((produtos: any) => {
          this.produtos = produtos
        })
    })
    
  }

}
