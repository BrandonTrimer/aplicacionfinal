import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DatabaseFireService } from 'src/app/services/database-fire.service';
import { NotaInt } from 'src/app/services/database.service';

@Component({
  selector: 'app-notas-nubedatos',
  templateUrl: './notas-nubedatos.page.html',
  styleUrls: ['./notas-nubedatos.page.scss'],
})
export class NotasNubedatosPage implements OnInit {

  nota: NotaInt = {
    titulo: '',
    contenido: '',
    color:''
  };

  newTitulo='';
  newContenido='';

  notaId;
  notaTitulo;
  notaContenido;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private toastCtrl: ToastController, private dbfire: DatabaseFireService ) { }

  ngOnInit() {
    this.notaId = this.activatedRoute.snapshot.paramMap.get('id');
    this.notaTitulo = this.activatedRoute.snapshot.paramMap.get('titulo');
    this.notaContenido = this.activatedRoute.snapshot.paramMap.get('contenido');
    console.log('cargar datos para actualizar',this.notaId,this.notaTitulo)
  }

  ionViewWillEnter(){
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
      this.dbfire.getNotaFire(id).subscribe(texto => {
        this.nota = texto;
        this.dbfire.getNotaFire(id).subscribe(console.log);
      });
    }
  }
  actualizarNota(){
    this.dbfire.updateNotaFire(this.notaId,this.notaTitulo,this.notaContenido).then(() =>{
      this.showMensaje('Nota Actualizada');
      this.router.navigateByUrl('/');
    }, err =>{
      this.showMensaje('Ups! Te salio mal')
    });
  }
  showMensaje(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  guardarNotaNube(){
    if(this.notaId == null){
      this.dbfire.addNota(this.nota).then(() =>{
        this.router.navigateByUrl('/notas-nube');
        this.showMensaje('Nota nueva Registrada');
      }, err =>{
        this.showMensaje('Ups, algo salio mal');
      });
    }else{
      this.dbfire.updateNotaFire(this.notaId,this.newTitulo,this.newContenido).then(() =>{
        this.showMensaje('Nota Actualizada');
        this.router.navigateByUrl('/notas-nube');
      }, err =>{
        this.showMensaje('Ups! Te salio mal')
      });
    }
  }

  eliminarNota(){
    this.dbfire.deleteNotaFiren(this.nota.id).then(() =>{
      this.showMensaje('Nota Eliminada');
      this.router.navigateByUrl('/');
    }, err => {
      this.showMensaje('Ups! algo salio mal');
    });
  }

  adicionarNota(){
    this.dbfire.addNota(this.nota).then(() =>{
      this.router.navigateByUrl('/');
      this.showMensaje('Nota nueva Registrada');
    }, err =>{
      this.showMensaje('Ups, algo salio mal');
    });
  }

  cancelar(){
    this.router.navigate(['notas-nube'])
  }

}
