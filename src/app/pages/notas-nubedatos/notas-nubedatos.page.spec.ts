import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotasNubedatosPage } from './notas-nubedatos.page';

describe('NotasNubedatosPage', () => {
  let component: NotasNubedatosPage;
  let fixture: ComponentFixture<NotasNubedatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasNubedatosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotasNubedatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
