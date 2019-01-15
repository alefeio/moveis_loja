import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-adicionar-ambiente',
  templateUrl: './adicionar-ambiente.component.html',
  styleUrls: ['./adicionar-ambiente.component.css']
})
export class AdicionarAmbienteComponent implements OnInit {

  @Output() public consultarAmbientes: EventEmitter<any> = new EventEmitter<any>()
  public email: string
  private imagem: any

  constructor(private bd: Bd, private progresso: Progresso) { }

  public progressoPublicacao: string = 'pendente'
  public porcentegemUpload: number

  public formAmbiente: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
  }

  public adicionarAmbiente(): void {

    let ambiente: any = {

      nome: this.formAmbiente.value.nome,
      imagem: this.imagem[0]

    }

    this.bd.adicionarAmbiente(ambiente)

    let continua = new Subject()

    let acompanhamentoUpload = interval(500)

    continua.next(true)

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        // console.log(this.progresso.estado)
        // console.log(this.progresso.status)

        this.progressoPublicacao = 'andamento'

        this.porcentegemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)

        if (this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          // emitir um evento do component parent (cliente)
          this.consultarAmbientes.emit()

          continua.next(false)
          setTimeout(() => {
            this.progressoPublicacao = 'pendente'
            this.formAmbiente.patchValue({
              nome: null
            })
          }, 4000)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
    // console.log(this.imagem)
  }

}
