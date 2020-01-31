import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DatabaseService, NotaInt } from '../services/database.service';


@Injectable({
  providedIn: 'root'
})
export class DatabaseFireService {

  private notas: Observable<NotaInt[]>;
  private notasColeccion: AngularFirestoreCollection<NotaInt>

  constructor(private afs: AngularFirestore) {
    this.notasColeccion = this.afs.collection<NotaInt>('notas');//obtener datos de firebase
    this.notas = this.notasColeccion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getNotasFire(): Observable<NotaInt[]> {
    console.log('recuperar notas fire',this.notas);
    return this.notas;
    
  }

  getNotaFire(id: string): Observable<NotaInt>{
    return this.notasColeccion.doc<NotaInt>(id).valueChanges().pipe(
      take(1),
      map(nota => {
        nota.id = id;
        return nota
      })
    );
  }

  addNota(nota: NotaInt): Promise<DocumentReference>{
    return this.notasColeccion.add(nota);
  }
  subirNota(nota: NotaInt): Promise<DocumentReference>{
    return this.notasColeccion.add(nota);
  }

  updateNotaFire(id,titulo,contenido): Promise<void>{
    console.log('updatenotafire',id,titulo,contenido)
    return this.notasColeccion.doc(id).update({ titulo: titulo, contenido: contenido,});
  }
  updateColorNotaFire(id,color): Promise<void>{
    console.log('updatenotafire',id,color)
    return this.notasColeccion.doc(id).update({color: color});
  }

  deleteNotaFiren(id: string): Promise<void>{
    return this.notasColeccion.doc(id).delete();
  }
}
