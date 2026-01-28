import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntajesPage } from './puntajes.page';

describe('PuntajesPage', () => {
  let component: PuntajesPage;
  let fixture: ComponentFixture<PuntajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
