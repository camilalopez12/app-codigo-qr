import { Component, OnInit } from '@angular/core';

import { BarcodeScanner, Barcode } from '@capacitor-mlkit/barcode-scanning';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage implements OnInit {

  darkMode = false;
  isSupported = false;
  barcodes: Barcode[] = [];

  nombre:any;
  correo:any;


  constructor(private alertController: AlertController) { }

  ngOnInit() {

    this.nombre = localStorage.getItem("nombre");
    this.correo = localStorage.getItem("correo");

    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
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

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permiso denegado',
      message: 'Favor conceder permisos de la camara a la aplicacion.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
