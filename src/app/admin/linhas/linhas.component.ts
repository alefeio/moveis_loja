import { Component, OnInit } from '@angular/core';
import { Bd } from 'src/app/bd.service';

@Component({
  selector: 'app-linhas',
  templateUrl: './linhas.component.html',
  styleUrls: ['./linhas.component.css']
})
export class LinhasComponent implements OnInit {

  public linhas: any

  constructor(private bd: Bd) { }

  ngOnInit() {
    this.consultarLinhas()
  }

  public consultarLinhas(): void {
    // this.bd.consultarLinhas()
    //   .then((linhas: any) => {
    //     this.linhas = linhas
    //   })
  }

}
