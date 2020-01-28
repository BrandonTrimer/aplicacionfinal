import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NotaInt{
  id: number,
  titulo: string,
  contenido: string
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

    getAutores(): Observable<NotaInt[]> {
      return this.notas .asObservable();
    }

    loadNotas(){
      return this.database.executeSql('SELECT * FROM autor', []).then(data => {
        let autores: NotaInt[] = [];

        if (data.rows.length > 0){
          for (var i = 0; i < data.rows.length; i++){
            autores.push({
              id: data.rows.item(i).id,
              titulo: data.rows.item(i).titulo,
              contenido: data.rows.item(i).contenido,
            });
          }
        }
        this.notas.next(autores);
      });
    }
}
