import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoVoteComponent } from './do-vote.component';

describe('DoVoteComponent', () => {
  let component: DoVoteComponent;
  let fixture: ComponentFixture<DoVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoVoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
