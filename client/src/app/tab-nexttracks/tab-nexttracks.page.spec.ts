import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNexttracksPage } from './tab-nexttracks.page';

describe('TabNexttracksPage', () => {
  let component: TabNexttracksPage;
  let fixture: ComponentFixture<TabNexttracksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabNexttracksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNexttracksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
