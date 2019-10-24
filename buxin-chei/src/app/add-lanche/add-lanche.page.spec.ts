import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanchePage } from './add-lanche.page';

describe('AddLanchePage', () => {
  let component: AddLanchePage;
  let fixture: ComponentFixture<AddLanchePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLanchePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanchePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
