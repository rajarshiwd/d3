import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D32Component } from './d32.component';

describe('D32Component', () => {
  let component: D32Component;
  let fixture: ComponentFixture<D32Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D32Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
