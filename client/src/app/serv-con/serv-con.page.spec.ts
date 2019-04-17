import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServConPage } from './serv-con.page';

describe('ServConPage', () => {
  let component: ServConPage;
  let fixture: ComponentFixture<ServConPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServConPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServConPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
