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

  nota = {};
  selectedView = 'note'; 

  componentes: Componente[] = [];

  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.db.getDatabaseStated().subscribe(rdy => {
      if (rdy){
        this.db.getNotas().subscribe(note => {
          console.log('iniciando la bd ', note)
          this.notas = note;
        })
      }
    });
  }

  navegarPagina1(){
    this.router.navigate(['/pagina1']);
  }

  addNotaP(){
    this.db.addNota(this.nota['titulo'], this.nota['contenido'])
    .then(_=> {
      this.nota = {};
    });
  }

  deleteNotaP(id){
    this.db.deleteNota(id)
    .then(_=> {
      console.log('lol nota delete',id)
    });
  }

  updateNotarP(id,titulo,contenido){
    this.router.navigate(['notas', id,titulo,contenido]);
    console.log(id,titulo,contenido);
  }

}
