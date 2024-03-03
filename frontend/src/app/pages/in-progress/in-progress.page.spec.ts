import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { InProgressPage } from './in-progress.page';

describe('InProgressPage', () => {
  let component: InProgressPage;
  let fixture: ComponentFixture<InProgressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
