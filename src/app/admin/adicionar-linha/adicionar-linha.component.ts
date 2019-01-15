import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-adicionar-linha',
  templateUrl: './adicionar-linha.component.html',
  styleUrls: ['./adicionar-linha.component.css']
})
export class AdicionarLinhaComponent implements OnInit {

  @Output() public consultarLinhas: EventEmitter<any> = new EventEmitter<any>()
  public email: string

  public progressoPublicacao: string = 'pendente'

  constructor(private bd: Bd) { }

  public formLinha: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
  }

  public adicionarLinha(): void {

    let linha: string = this.formLinha.value.nome

    this.bd.adicionarLinha(linha)

    this.consultarLinhas.emit()
    
    this.progressoPublicacao = 'concluido'
    setTimeout(() => {
      this.progressoPublicacao = 'pendente'
      this.formLinha.patchValue({
        nome: null
      })
    }, 4000)
  }

}
