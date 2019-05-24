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
      this.consultarProdutosPorFiltro()
    })
  }

  consultarProdutosPorFiltro() {
    this.bd.buscarProdutoPorLinha(this.linha).then(resp=>{
      this.produtos = [];
      for(let p of resp){
        for(let c of p.cores){
          if(c.destaque === true){
            p.cores = c
            for(let i of c.imagem){
              if(i.destaque === true){
                p.cores.imagem = i
              }
            }
          }
        }
        this.produtos.push(p)
      };
    });
  }
}
