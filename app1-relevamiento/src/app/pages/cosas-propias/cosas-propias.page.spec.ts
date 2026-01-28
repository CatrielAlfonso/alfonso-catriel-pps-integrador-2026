import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CosasPropiasPage } from './cosas-propias.page';

describe('CosasPropiasPage', () => {
  let component: CosasPropiasPage;
  let fixture: ComponentFixture<CosasPropiasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CosasPropiasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
