import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAddPage } from './tab-add.page';

describe('TabAddPage', () => {
  let component: TabAddPage;
  let fixture: ComponentFixture<TabAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
