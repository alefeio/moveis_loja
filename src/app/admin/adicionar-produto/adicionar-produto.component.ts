import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Bd } from 'src/app/bd.service';
import { Progresso } from 'src/app/progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-adicionar-produto',
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent implements OnInit {

  @Output() public consultarProdutos: EventEmitter<any> = new EventEmitter<any>()
  public email: string
  private imagem: any
  public ambientes: Array<any> = []
  public linhas: Array<any> = []

  public key: string

  constructor(private bd: Bd, private progresso: Progresso) { }

  public progressoPublicacao: string = 'pendente'
  public porcentegemUpload: number

  public formProduto: FormGroup = new FormGroup({
    'ambiente': new FormControl(null, [Validators.required]),
    'linha': new FormControl(null, [Validators.required]),
    'titulo': new FormControl(null, [Validators.required]),
    'descricao_oferta': new FormControl(null),
    'marca': new FormControl(null),
    'valorAVista': new FormControl(null, [Validators.required]),
    'valorAPrazo': new FormControl(null, [Validators.required]),
    'cor': new FormControl(null),
    'destaque': new FormControl(null, [Validators.required])
  })

  ngOnInit() {
    this.consultarAmbientes()
    this.consultarLinhas()
  }

  public adicionarProduto(key): void {

    let produto: any = {

      ambiente: this.formProduto.value.ambiente,
      linha: this.formProduto.value.linha,
      titulo: this.formProduto.value.titulo,
      descricao_oferta: this.formProduto.value.descricao_oferta,
      marca: this.formProduto.value.marca,
      valorAVista: this.formProduto.value.valorAVista,
      valorAPrazo: this.formProduto.value.valorAPrazo,
      cor: this.formProduto.value.cor,
      destaque: this.formProduto.value.destaque,
      imagem: this.imagem[0]

    }

    // console.log(produto)

    this.bd.adicionarProduto(produto)

    this.acompanhaUpload()

  }

  public acompanhaUpload(): void {
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
          this.consultarProdutos.emit()

          continua.next(false)
          setTimeout(() => {
            this.progressoPublicacao = 'pendente'
            this.formProduto.patchValue({
              ambiente: null,
              linha: null,
              titulo: null,
              descricao_oferta: null,
              marca: null,
              valor: null,
              cor: null,
              destaque: null
            })
          }, 4000)
        }
      })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
    console.log(this.imagem)
  }

  public consultarAmbientes(): void {
    // this.bd.consultarAmbientes()
    //   .then((ambientes: any) => {
    //     this.ambientes = ambientes
    //   })
  }

  public consultarLinhas(): void {
    // this.bd.consultarLinhas()
    //   .then((linhas: any) => {
    //     this.linhas = linhas
    //   })
  }

}
