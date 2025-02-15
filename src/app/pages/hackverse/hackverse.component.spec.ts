import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackverseComponent } from './hackverse.component';

describe('HackverseComponent', () => {
  let component: HackverseComponent;
  let fixture: ComponentFixture<HackverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackverseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
