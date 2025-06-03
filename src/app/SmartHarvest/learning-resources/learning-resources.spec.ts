import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningResources } from './learning-resources';

describe('LearningResources', () => {
  let component: LearningResources;
  let fixture: ComponentFixture<LearningResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningResources]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningResources);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
