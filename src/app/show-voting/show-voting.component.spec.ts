import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVotingComponent } from './show-voting.component';

describe('ShowVotingComponent', () => {
  let component: ShowVotingComponent;
  let fixture: ComponentFixture<ShowVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowVotingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
