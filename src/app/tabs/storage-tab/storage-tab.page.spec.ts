import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageTabPage } from './storage-tab.page';

describe('StorageTabPage', () => {
  let component: StorageTabPage;
  let fixture: ComponentFixture<StorageTabPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StorageTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
