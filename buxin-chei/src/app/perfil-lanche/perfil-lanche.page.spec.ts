import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilLanchePage } from './perfil-lanche.page';

describe('PerfilLanchePage', () => {
  let component: PerfilLanchePage;
  let fixture: ComponentFixture<PerfilLanchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilLanchePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilLanchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
