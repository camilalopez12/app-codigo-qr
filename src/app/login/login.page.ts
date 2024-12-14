import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import { NavController, AnimationController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  darkMode = false;

  usuarios: any[] = [];

  //variables registro
  r_correo = "";
  r_nombre = "";
  r_clave = "";
  r_tipo = "";

  //variables login
  l_correo = "";
  l_clave = "";

  //variables reset clave
  o_correo = "";

  constructor(private navCtrl: NavController, private anim:AnimationController, private http:HttpClient) {

  
 }

  ngOnInit() {

    this.profesor();

    this.recarga_usuarios();

    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(2000)
    .iterations(Infinity)
    .fromTo("transform","scale(1) rotate(-20deg)", "scale(1.3) rotate(20deg")
    .play();

  }
  
  //presion boton darmode
  toggleDarkMode(){
    this.darkMode = !this.darkMode;

    document.body.classList.toggle('dark', this.darkMode);

    if(this.darkMode){
      localStorage.setItem('darkModeActivated','true');
    }else{
      localStorage.setItem('darkModeActivated','false');
    }
  }

  //navegacion

  profesor(){
    jQuery("#form-alumno").fadeOut();
    jQuery("#form-registro").fadeOut();
    jQuery("#form-profesor").fadeIn();
    jQuery("#form-olvidado").fadeOut();
  }

  alumno(){
    jQuery("#form-alumno").fadeIn();
    jQuery("#form-registro").fadeOut();
    jQuery("#form-profesor").fadeOut();
    jQuery("#form-olvidado").fadeOut();
  }

  registro(){
    jQuery("#form-alumno").fadeOut();
    jQuery("#form-registro").fadeIn();
    jQuery("#form-profesor").fadeOut();
    jQuery("#form-olvidado").fadeOut();
  }

  olvidado(){
    jQuery("#form-alumno").fadeOut();
    jQuery("#form-registro").fadeOut();
    jQuery("#form-profesor").fadeOut();
    jQuery("#form-olvidado").fadeIn();
  }

  //funciones

  recarga_usuarios(){

    let array_cliente = localStorage.getItem('array_cliente');

    if(array_cliente){

      this.usuarios = JSON.parse(array_cliente);

    }else{

      this.usuarios = [];

    }

    console.log(this.usuarios);

  }

  limpia_localstorage(){

    localStorage.removeItem('array_cliente');

  }

  registrarse(){

    var nuevo_usuario = {nombre:this.r_nombre,correo:this.r_correo, clave:this.r_clave, tipo:this.r_tipo};

    const existe = this.usuarios.some(usuario =>usuario.correo === nuevo_usuario.correo);

    if(!existe){

      this.usuarios.push(nuevo_usuario);

      localStorage.setItem('array_cliente', JSON.stringify(this.usuarios));

      alert("Nuevo usuario registrado");

      this.r_clave = "";
      this.r_nombre = "";
      this.r_correo = "";

      this.profesor();

    }else{

      alert("El correo ya esta registrado");

    }

  }

  login(){

    const validausuario = this.usuarios.find(usuario => 
      usuario.correo === this.l_correo && usuario.clave === this.l_clave
    );

    if(validausuario){
      
      if(validausuario.tipo == "1"){
        this.navCtrl.navigateRoot("/homeProfesor");
      }else{
        this.navCtrl.navigateRoot("/homeAlumno");
      }

      localStorage.setItem('nombre',validausuario.nombre);
      localStorage.setItem('correo',validausuario.correo);

    }else{
      alert("login incorrecto");
    }

  }

  async reset_clave(){

    for(let u of this.usuarios){
      if(u.correo == this.o_correo){
        let nueva = Math.random().toString(36).slice(-6);

        u.clave = nueva;

        let body = {
          "nombre": u.nombre,
          "app": "Asistencia APP",
          "clave": nueva,
          "email":u.correo
        };

        this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data) => {
          alert("Clave reiniciada");
        });

        this.o_correo = "";

        this.profesor();

        return
      }
    }

    alert("Correo no registrado");

  }



}
