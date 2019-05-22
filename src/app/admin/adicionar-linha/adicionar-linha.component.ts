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
  public ambientes: Array<any> = []
  public progressoPublicacao: string = 'pendente'

  constructor(private bd: Bd) { }

  public formLinha: FormGroup = new FormGroup({
    'ambiente': new FormControl(null, [Validators.required]),
    'nome': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    this.consultarAmbientes()
  }

  public adicionarLinha(): void {

    let linha: any =  {
      ambiente: this.formLinha.value.ambiente,
      nome: this.formLinha.value.nome
    }

    this.bd.adicionarLinha(linha)

    console.log('Linha a ser add: ', linha)

    this.consultarLinhas.emit()
    
    this.progressoPublicacao = 'concluido'
    setTimeout(() => {
      this.progressoPublicacao = 'pendente'
      this.formLinha.patchValue({
        ambiente: null,
        nome: null
      })
    }, 4000)
  }

  public consultarAmbientes(): void {
    // this.bd.consultarAmbientes()
    //   .then((ambientes: any) => {
    //     this.ambientes = ambientes.reverse()
    //   })
  }

}
