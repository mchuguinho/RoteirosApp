import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPontoIntPage } from './add-ponto-int.page';

describe('AddPontoIntPage', () => {
  let component: AddPontoIntPage;
  let fixture: ComponentFixture<AddPontoIntPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPontoIntPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
