import { Component, OnInit } from '@angular/core';

import { DatabaseService } from './../../services/database.service';
import { ActivatedRoute ,Router } from '@angular/router';



@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {

  nota = {};

  notaId;
  notaTitulo;
  notaContenido;

  constructor(private db: DatabaseService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.notaId = this.activatedRoute.snapshot.paramMap.get('id');
    this.notaTitulo = this.activatedRoute.snapshot.paramMap.get('titulo');
    this.notaContenido = this.activatedRoute.snapshot.paramMap.get('contenido');
  }

  addNotaP(){
    this.db.addNota(this.nota['titulo'], this.nota['contenido'])
    .then(_=> {
      this.nota = {};
      this.router.navigate(['inicio']);
    });
  }

  updateNotaP(){
    this.db.updateNota(this.notaId, this.notaTitulo, this.notaContenido)
    .then(_=> {
      this.router.navigate(['inicio']);
    });
  }
  guardarNotaP(){
    if(this.notaId == ''){
      this.db.addNota(this.nota['titulo'], this.nota['contenido'])
      .then(_=> {
        this.nota = {};
        this.router.navigate(['inicio']);
        console.log('crear');
      });
    }else{
      this.db.updateNota(this.notaId, this.notaTitulo, this.notaContenido)
      .then(_=> {
        this.router.navigate(['inicio']);
        console.log('editar');
      });
    }
  }
}
