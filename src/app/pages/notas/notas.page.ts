import { Component, OnInit } from '@angular/core';

import { DatabaseService } from './../../services/database.service';
import { ActivatedRoute ,Router } from '@angular/router';

import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  nota = {};

  newTitulo='';
  newContenido='';

  notaId;
  notaTitulo;
  notaContenido;

  constructor(private db: DatabaseService, private router: Router, private activatedRoute: ActivatedRoute,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.notaId = this.activatedRoute.snapshot.paramMap.get('id');
    this.notaTitulo = this.activatedRoute.snapshot.paramMap.get('titulo');
    this.notaContenido = this.activatedRoute.snapshot.paramMap.get('contenido');
  }
  showMensaje(msg){
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  guardarNotaP(){
    if(this.notaId == null){
      this.db.addNota(this.nota['titulo'], this.nota['contenido'])
      .then(_=> {
        this.nota = {};
        this.router.navigate(['inicio']);
        this.showMensaje('Nueva nota creada');
        console.log('crear', this.notaId);
      });
    }else{
      this.db.updateNota(this.notaId, this.newTitulo, this.newContenido)
      .then(_=> {
        this.router.navigate(['inicio']);
        this.showMensaje('Nota actualizada');
        console.log('texto de la actualizacion',this.notaId,this.newContenido, this.newTitulo,'lol');
      });
    }
  }
  cancelar(){
    this.router.navigate(['inicio'])
  }
}
