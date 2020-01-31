import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Componente } from '../../interfaces/interfaces';

import { Observable} from 'rxjs';
import { NotaInt } from 'src/app/services/database.service';
import { DatabaseService } from './../../services/database.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  notas: NotaInt[] = [];

  notacid;
  op: boolean = false;
  op2: boolean = false;

  color1 = "primary";
  color2 = "secondary";
  color3 = "tertiary";
  color4 = "success";
  color5 = "danger";
  

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseStated().subscribe(rdy => {
      if (rdy){
        this.db.getNotas().subscribe(note => {
          console.log('iniciando la bd note', note)
          this.notas = note;
        })
      }
    });
  }

  

  deleteNotaP(id){
    this.db.deleteNota(id)
    .then(_=> {
      console.log('lol nota delete',id)
    });
  }

  updateNotaP(id,titulo,contenido){
    console.log(id,titulo,contenido);
    this.router.navigate(['notas', id,titulo,contenido]);
  }

  opciones(id){
    this.op = true;
    this.op2 = false;
    this.notacid = id;
    console.log('op',this.op,id)
  }
  cancelar(){
    this.op = false;
    console.log('op',this.op)
  }
  cerrar(){
    this.op = false;
    this.op2 = false;
    console.log('carrar')
  }

  colorNota(){
    this.op = false;
    this.op2 = true;
  }
  cambiarColorNota(id, color){
    this.db.updateColorNota(id, color)
      .then(_=> {
        this.router.navigate(['inicio']);
        console.log('texto de la actualizacion',id, color);
      });
      this.op2 = false;
    }
}
