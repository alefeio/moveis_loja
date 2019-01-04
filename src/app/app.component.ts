import { Component, OnInit } from '@angular/core';
import * as backend from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {

    var config = {
      apiKey: "AIzaSyDn61plbeCHPLLICG_L7Oou-0-DePPlM2A",
      authDomain: "loja-mega-moveis.firebaseapp.com",
      databaseURL: "https://loja-mega-moveis.firebaseio.com",
      projectId: "loja-mega-moveis",
      storageBucket: "loja-mega-moveis.appspot.com",
      messagingSenderId: "584094181219"
    };

    backend.initializeApp(config)
  }
}
