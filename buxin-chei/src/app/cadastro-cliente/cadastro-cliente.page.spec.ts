import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroClientePage } from './cadastro-cliente.page';

describe('CadastroClientePage', () => {
  let component: CadastroClientePage;
  let fixture: ComponentFixture<CadastroClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
