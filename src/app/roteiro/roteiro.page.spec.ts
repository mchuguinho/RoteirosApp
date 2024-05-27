import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { RoteiroPage } from './roteiro.page';

describe('RoteiroPage', () => {
  let component: RoteiroPage;
  let fixture: ComponentFixture<RoteiroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoteiroPage],
      imports: [IonicModule.forRoot(), RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RoteiroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

