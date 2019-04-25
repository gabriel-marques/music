import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLastaddedPage } from './tab-lastadded.page';

describe('TabLastaddedPage', () => {
  let component: TabLastaddedPage;
  let fixture: ComponentFixture<TabLastaddedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabLastaddedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLastaddedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
