import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTabPage } from './search-tab.page';

describe('SearchTabPage', () => {
  let component: SearchTabPage;
  let fixture: ComponentFixture<SearchTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
