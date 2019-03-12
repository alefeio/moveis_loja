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
  hexadecimal: any = []
  hexa: any = []

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
        // this.coresFunc(arrayCores)
        this.coresNew(arrayCores)
      });
    })
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

  mostrarImg(i){
    console.log(i)
  }

  coresNew(arrayCores) {
    let cod: Array<any> = []
    let r:Array<any> = []
    for (let a of arrayCores) {
      cod.push(a)
    }
    this.codigos = cod
    console.log(this.codigos); 
  }

  coresFunc(arrayCores) {
    let cont = 0;
    let cor: Array<any>
    let cor2: Array<any>
    let tamanho: string
    for (let i = 0; i < arrayCores.length; i++) {
      cont += i
      switch (cont) {
        case 0: {
          cor = arrayCores[cont]
          switch (cor.length) {
            case 1: {
              tamanho = '100%'
              break;
            }
            case 2: {
              tamanho = '50%'
              break
            }
            case 3: {
              tamanho = '25%'
              break
            }
            case 4: {
              tamanho = '12.5%'
              break
            }
          }
          var divPrinc = document.getElementById('numCores')
          for (let q = 0; q < 1; q++) {
            var div = document.createElement('div');
            div.setAttribute('id', 'jCores1')
            div.setAttribute('class', 'row')
            div.setAttribute('style', 'border-radius: 50% !important; overflow: hidden !important; border: solid 1px black !important; height: 10% !important; width: 10% !important;')
            divPrinc.appendChild(document.createTextNode(' '))
            divPrinc.appendChild(div);
            div.innerText = ' '
          }
          let hexa: Array<any> = []
          for (let i of cor) {
            hexa.push(i.hexa);
            let cor1: Array<any> = []
            for (let corHexa of hexa) {
              cor1.push(corHexa.hexa)
            }
            switch (cor1.length) {
              case 1: {
                var divSub = document.getElementById('jCores1');
                for (let r = 0; r < hexa.length; r++) {
                  var subDiv = document.createElement('div');
                  subDiv.setAttribute('style', 'height: 30px; width: ' + tamanho + '; background: ' + cor1[0]);
                  divSub.appendChild(subDiv);
                }
                break;
              }
              case 2: {
                var divSub = document.getElementById('jCores1');
                for (let r = 1; r < hexa.length; r++) {
                  var subDiv = document.createElement('div');
                  subDiv.setAttribute('style', ' height: 30px; width: ' + tamanho + '; background: ' + cor1[1]);
                  divSub.appendChild(subDiv);
                }
                break;
              }
              case 3: {
                console.log("outra cor");
                break;
              }
              case 4: {
                console.log("outra  cor");
                break;
              }
              default: {
                console.log("outra cor");
                break;
              }
            }
          }
          break;
        }
        case 1: {
          cor2 = arrayCores[cont]
          switch (cor2.length) {
            case 1: {
              tamanho = '100%'
              break;
            }
            case 2: {
              tamanho = '50%'
              break
            }
            case 3: {
              tamanho = '25%'
              break
            }
            case 4: {
              tamanho = '12.5%'
              break
            }
          }
          var divFilho = document.getElementById('numCores')
          for (let q = 0; q < 1; q++) {
            var div = document.createElement('div');
            div.setAttribute('id', 'jCores2')
            div.setAttribute('class', 'row')
            div.setAttribute('style', 'border-radius: 50% !important; overflow: hidden !important; margin-left: 20px; border: solid 1px black !important; height: 10% !important; width: 10% !important;')
            divFilho.appendChild(document.createTextNode(' '))
            divFilho.appendChild(div);
            div.innerText = ' '
          }
          let hexa: Array<any> = []
          for (let i of cor2) {
            hexa.push(i.hexa);
            let cor1: Array<any> = []
            for (let corHexa of hexa) {
              cor1.push(corHexa.hexa)
            }
            switch (cor1.length) {
              case 1: {
                var divSub = document.getElementById('jCores2');
                for (let r = 0; r < hexa.length; r++) {
                  var subDiv = document.createElement('div');
                  subDiv.setAttribute('style', 'height: 30px; width: ' + tamanho + '!important; background: ' + cor1[0]);
                  divSub.appendChild(subDiv);
                }
                break;
              }
              case 2: {
                var divSub = document.getElementById('jCores2');
                for (let r = 1; r < hexa.length; r++) {
                  var subDiv = document.createElement('div');
                  subDiv.setAttribute('style', ' height: 30px; width: ' + tamanho + '; background: ' + cor1[1]);
                  divSub.appendChild(subDiv);
                }
                break;
              }
              case 3: {
                console.log("outra cor");
                break;
              }
              case 4: {
                console.log("outra cor");
                break;
              }
              default: {
                console.log("outra cor");
                break;
              }
            }
          }
          break;
        }
        default: {
          break;
        }
      }
    };
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)
  }
}