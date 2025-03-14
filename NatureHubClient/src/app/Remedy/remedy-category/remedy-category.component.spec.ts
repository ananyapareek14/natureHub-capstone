import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedyCategoryComponent } from './remedy-category.component';

describe('RemedyCategoryComponent', () => {
  let component: RemedyCategoryComponent;
  let fixture: ComponentFixture<RemedyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemedyCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemedyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
