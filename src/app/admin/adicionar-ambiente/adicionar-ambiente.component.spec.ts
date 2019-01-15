import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAmbienteComponent } from './adicionar-ambiente.component';

describe('AdicionarAmbienteComponent', () => {
  let component: AdicionarAmbienteComponent;
  let fixture: ComponentFixture<AdicionarAmbienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarAmbienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
