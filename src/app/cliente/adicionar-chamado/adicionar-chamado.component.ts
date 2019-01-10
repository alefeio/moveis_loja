import { Chamado } from './../../shared/chamados.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import * as backend from 'firebase'
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-adicionar-chamado',
  templateUrl: './adicionar-chamado.component.html',
  styleUrls: ['./adicionar-chamado.component.css']
})
export class AdicionarChamadoComponent implements OnInit {

  @Output() public consultarChamados: EventEmitter<any> = new EventEmitter<any>()
  public email: string
  private imagem: any
  
  constructor(private bd: Bd, private progresso: Progresso) { }


  public progressoPublicacao: string = 'pendente'
  public porcentegemUpload: number

  public formChamado: FormGroup = new FormGroup({
    'titulo': new FormControl(null, [Validators.required]),
    'destinatario': new FormControl(null, [Validators.required]),
    'mensagem': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    backend.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public adicionarChamado(): void {

    let chamado: Chamado = {
      email: this.email,
      titulo: this.formChamado.value.titulo,
      destinatario: this.formChamado.value.destinatario,
      mensagem: this.formChamado.value.mensagem,
      imagem: this.imagem[0]
    }

    this.bd.adicionarChamado(chamado)

    let continua = new Subject()

    let acompanhamentoUpload = interval(1500)

    continua.next(true)

    acompanhamentoUpload
      .pipe(takeUntil(continua))
      .subscribe(() => {
        // console.log(this.progresso.estado)
        // console.log(this.progresso.status)

        this.progressoPublicacao = 'andamento'

        this.porcentegemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes)*100)

        if(this.progresso.status === 'concluido') {
          this.progressoPublicacao = 'concluido'

          // emitir um evento do component parent (cliente)
          this.consultarChamados.emit()

          continua.next(false)
          setTimeout(()=>{
            this.progressoPublicacao = 'pendente'
            this.formChamado.patchValue({
              destinatario: null,
              titulo: null,
              mensagem: null
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
