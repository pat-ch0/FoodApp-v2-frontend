import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityTabPage } from './community-tab.page';

describe('CommunityTabPage', () => {
  let component: CommunityTabPage;
  let fixture: ComponentFixture<CommunityTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CommunityTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
