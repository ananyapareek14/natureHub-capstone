import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTipsListComponent } from './health-tips-list.component';

describe('HealthTipsListComponent', () => {
  let component: HealthTipsListComponent;
  let fixture: ComponentFixture<HealthTipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HealthTipsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthTipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
