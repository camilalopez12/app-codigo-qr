import { Component } from '@angular/core';
import * as jQuery from 'jquery';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  darkMode = false;
  textoQr = "prueba2024";

  fecha = new Date();

  fechahoy = this.fecha.getDate()+"/"+this.fecha.getMonth()+"/"+this.fecha.getFullYear();

  constructor() {

  }

  toggleDarkMode(){
    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark', this.darkMode);

    if(this.darkMode){
      localStorage.setItem('darkModeActivated','true');
      console.log('true');
    }else{
      localStorage.setItem('darkModeActivated','false');
      console.log('false');
    }
  }


  generarqr(){
    jQuery("#qr").fadeIn();
  }

}
