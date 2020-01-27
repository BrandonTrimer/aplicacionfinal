import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Componente } from '../../interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  Componentes: Componente[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarPagina1(){
    this.router.navigate(['/pagina1']);
  }

}
