import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BiblioPage } from './biblio.page';

describe('BiblioPage', () => {
  let component: BiblioPage;
  let fixture: ComponentFixture<BiblioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BiblioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
