import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTipsDetailComponent } from './health-tips-detail.component';

describe('HealthTipsDetailComponent', () => {
  let component: HealthTipsDetailComponent;
  let fixture: ComponentFixture<HealthTipsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthTipsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTipsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
