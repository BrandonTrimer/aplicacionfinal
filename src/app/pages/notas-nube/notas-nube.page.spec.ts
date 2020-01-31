import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotasNubePage } from './notas-nube.page';

describe('NotasNubePage', () => {
  let component: NotasNubePage;
  let fixture: ComponentFixture<NotasNubePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotasNubePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotasNubePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
