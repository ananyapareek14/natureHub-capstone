import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemedyListComponent } from './remedy-list.component';

describe('RemedyListComponent', () => {
  let component: RemedyListComponent;
  let fixture: ComponentFixture<RemedyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemedyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemedyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
