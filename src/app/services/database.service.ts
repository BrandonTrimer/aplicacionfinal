import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';



export interface NotaInt{
  id?: string,
  titulo: string,
  contenido: string,
  color?: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  notas = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite,
    private http: HttpClient) {
      this.plt.ready().then(() =>{
        this.sqlite.create({
          name: 'notas.db',
          location: 'default'
        })
        .then((db: SQLiteObject) =>{
          this.database =  db;
          this.seedDatabase();
        });
      });
     }

     seedDatabase() {
      this.http.get('assets/mySql.sql', { responseType: 'text'})
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadNotas();
          this.dbReady.next(true);
        })
        .catch( e => console.error(e));
      });
    }

    getDatabaseStated(){
      return this.dbReady.asObservable();
    }

    getNotas(): Observable<NotaInt[]> {
      return this.notas .asObservable();
    }

    loadNotas(){
      return this.database.executeSql('SELECT * FROM nota', []).then(data => {
        let notas: NotaInt[] = [];

        if (data.rows.length > 0){
          for (var i = 0; i < data.rows.length; i++){
            notas.push({
              id: data.rows.item(i).id,
              titulo: data.rows.item(i).titulo,
              contenido: data.rows.item(i).contenido,
              color: data.rows.item(i).color,
            });
          }
        }
        this.notas.next(notas);
      });
    }

    addNota(titulo, contenido){
      let data = [titulo, contenido];
      return this.database.executeSql('INSERT INTO nota (titulo, contenido) VALUES (?, ?)',data).then(data =>{
        this.loadNotas();
      });
    }

    getNota(id): Promise<NotaInt>{
      return this.database.executeSql('SELECT * FROM nota WHERE id = ?', [id]).then(data => {
        return {
          id: data.rows.item(0).id,
          titulo: data.rows.item(0).titulo,
          contenido: data.rows.item(0).contenido
        }
      });
    }

    deleteNota(id){
      return this.database.executeSql('DELETE FROM nota WHERE id = ?',[id]).then(_ => {
        this.loadNotas();
        console.log('id de eliminar',id)
      });
    }

    updateNota(id:number,titulo:string,contenido:string){
      let data = [titulo,contenido,id];
      console.log('database',data);
      return this.database.executeSql('UPDATE nota SET titulo = ?, contenido = ? WHERE id = ?', [titulo,contenido,id]).then(_ =>{
        this.loadNotas();
        console.log('database2',titulo);
      })
    }

    updateColorNota(id, color){
      let data = [color,id];
      console.log('database',data);
      return this.database.executeSql('UPDATE nota SET color = ? WHERE id = ?', [color,id]).then(_ =>{
        this.loadNotas();
        console.log('database2',color);
      })
    }
}
