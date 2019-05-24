import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';
import { SessionService } from '../../sessao.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public _idUsuario: string
  public pedidos: any

  constructor(private bd: Bd,
              private sessao:SessionService) { }

  ngOnInit() {
    let usuario = this.sessao.getSessao();
    this._idUsuario = usuario._id;
    this.consultarPedidos()
  }

  async consultarPedidos() {
    this.pedidos = await this.bd.buscarPedidos(this._idUsuario);
  }
}
