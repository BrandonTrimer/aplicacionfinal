import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { DatabaseFireService } from 'src/app/services/database-fire.service';
import { NotaInt } from 'src/app/services/database.service';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-notas-nube',
  templateUrl: './notas-nube.page.html',
  styleUrls: ['./notas-nube.page.scss'],
})
export class NotasNubePage implements OnInit {

  nota: NotaInt = {
    titulo: '',
    contenido: '',
    color: ''
  };

  notacid;
  op: boolean = false;
  op2: boolean = false;

  color1 = "primary";
  color2 = "secondary";
  color3 = "tertiary";
  color4 = "success";
  color5 = "dark";

  private notas: Observable<NotaInt[]>;
  constructor(private dbfire: DatabaseFireService, private activatedRoute: ActivatedRoute, private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.notas = this.dbfire.getNotasFire();
    this.dbfire.getNotasFire().subscribe(res=>{console.log('notas fire', res);});
    this.dbfire.getNotasFire().subscribe(console.log);
  }

  ionViewWillEnter(){
    
  }

  actualizarNota(id, titulo, contenido){
    this.router.navigate(['notas-nubedatos', id,titulo,contenido]);
  }
  showMensaje(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  eliminarNota(id){
    this.dbfire.deleteNotaFiren(id).then(() =>{
      this.showMensaje('Nota Eliminada');
    }, err => {
      this.showMensaje('Ups! algo salio mal');
    });
  }

  opciones(id){
    this.op = true;
    this.op2 = false;
    this.notacid = id;
    console.log('op',this.op,id)
  }
  cancelar(){
    this.op = false;
  }
  colorNota(){
    this.op = false;
    this.op2 = true;
  }

  actualizarColorNota(id, color){
    this.dbfire.updateColorNotaFire(id, color).then(() =>{
      
    }, err =>{
      
    });
    this.op2 = false;
  }

  

}
