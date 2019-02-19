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
    // config alexandre
    var config = {
      apiKey: "AIzaSyDn61plbeCHPLLICG_L7Oou-0-DePPlM2A",
      authDomain: "loja-mega-moveis.firebaseapp.com",
      databaseURL: "https://loja-mega-moveis.firebaseio.com",
      projectId: "loja-mega-moveis",
      storageBucket: "loja-mega-moveis.appspot.com",
      messagingSenderId: "584094181219"
    };
    // confg leozinho
    // var config = {
    //   apiKey: "AIzaSyCk4AYqYN2k-zytxxHoJ8jc1seQtcHLr90",
    //   authDomain: "megamoveis-d962f.firebaseapp.com",
    //   databaseURL: "https://megamoveis-d962f.firebaseio.com",
    //   projectId: "megamoveis-d962f",
    //   storageBucket: "megamoveis-d962f.appspot.com",
    //   messagingSenderId: "614209468970"
    // }
    backend.initializeApp(config)
  }
}
