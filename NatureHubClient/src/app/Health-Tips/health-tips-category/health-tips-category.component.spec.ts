import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTipsCategoryComponent } from './health-tips-category.component';

describe('HealthTipsCategoryComponent', () => {
  let component: HealthTipsCategoryComponent;
  let fixture: ComponentFixture<HealthTipsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthTipsCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTipsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
