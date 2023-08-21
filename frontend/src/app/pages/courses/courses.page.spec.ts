import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CoursesPage } from './courses.page';

describe('CoursesPage', () => {
  let component: CoursesPage;
  let fixture: ComponentFixture<CoursesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
