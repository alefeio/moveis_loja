import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { OfertasService } from './../ofertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css'],
  providers: [ OfertasService ]
})
export class ContatoComponent implements OnInit {

  idRotaPai: number

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {
      this.idRotaPai = parametros.id
      console.log(`Id da rota pai no contato: ${this.idRotaPai}`)
    })
  }

}
