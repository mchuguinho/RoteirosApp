import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouteAddPage } from './route-add.page';

describe('RouteAddPage', () => {
  let component: RouteAddPage;
  let fixture: ComponentFixture<RouteAddPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
