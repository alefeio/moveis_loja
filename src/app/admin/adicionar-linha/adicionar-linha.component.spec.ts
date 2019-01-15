import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarLinhaComponent } from './adicionar-linha.component';

describe('AdicionarLinhaComponent', () => {
  let component: AdicionarLinhaComponent;
  let fixture: ComponentFixture<AdicionarLinhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarLinhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarLinhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
