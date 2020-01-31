import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Componente } from '../../interfaces/interfaces';

import { Observable} from 'rxjs';
import { NotaInt } from 'src/app/services/database.service';
import { DatabaseService } from './../../services/database.service';

import { DatabaseFireService } from 'src/app/services/database-fire.service';

import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

 

  notas: NotaInt[] = [];

  notasF: NotaInt;

  notacid;
  notaTitulo;
  notaContenido;
  notaColor;

  notaFire: NotaInt = {
    titulo: '',
    contenido: '',
    color: ''
  };

  op: boolean = false;
  op2: boolean = false;

  color1 = "primary";
  color2 = "secondary";
  color3 = "tertiary";
  color4 = "success";
  color5 = "dark";
  
  ttsText: "";
  local: 'en-US';

  constructor(private dbfire: DatabaseFireService, private db: DatabaseService, private router: Router,
    private tts: TextToSpeech) { }

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

  opciones(id,titulo,contenido,color){
    this.op = true;
    this.op2 = false;
    this.notacid = id;
    this.notaTitulo = titulo;
    this.notaContenido = contenido;
    this.notaColor = color;

    this.ttsText = contenido;


    this.notaFire = {
      titulo: this.notaTitulo,
      contenido: this.notaContenido,
      color: this.notaColor
    };
    
    console.log('op',this.op,id, this.notaTitulo,this.notaColor);
    console.log('notafire',this.notaFire);
    console.log('notafire no',this.notas);
  }
  cancelar(){
    this.op = false;
    console.log('op',this.op)
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

  subirNotaNube(){
    this.dbfire.subirNota(this.notaFire).then(() =>{
      this.router.navigateByUrl('/notas-nube');
      console.log('notafire',this.notaFire)
    }, err =>{
      console.log('error notafire',this.notaFire)
    });
  }
  testTTS(){
    this.tts.speak({
      text: this.ttsText,
      locale: this.local
    });
  }
}
