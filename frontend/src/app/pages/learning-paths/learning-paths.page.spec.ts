import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LearningPathsPage } from './learning-paths.page';

describe('LearningPathsPage', () => {
  let component: LearningPathsPage;
  let fixture: ComponentFixture<LearningPathsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LearningPathsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
