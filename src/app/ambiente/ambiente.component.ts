import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Bd } from 'src/app/bd.service';


@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.css']
})
export class AmbienteComponent implements OnInit {

  public produtos:Array<any> = []
  public ambiente: string
  public linhas: Array<any> = []

  constructor(
    private bd: Bd,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.route.params.subscribe((parametros: Params) => {
      this.ambiente = parametros.param
      this.consultarProdutosPorFiltro()
      this.consultarLinhasPorAmbiente()
    })
  }

  consultarProdutosPorFiltro() {
    this.bd.buscarProdutoPorAmbiente(this.ambiente).then((resp: any) => {
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

  consultarLinhasPorAmbiente() {
    this.bd.buscarLinhasPorAmbiente(this.ambiente).then((resp: any) => {
      this.linhas = resp;
    });
  }

  ofertaDetalhe(chaveProduto) {
    this.router.navigate(['/oferta', chaveProduto]);
  }
}
