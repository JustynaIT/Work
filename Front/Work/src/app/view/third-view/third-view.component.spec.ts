import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdViewComponent } from './third-view.component';

describe('ThirdViewComponent', () => {
  let component: ThirdViewComponent;
  let fixture: ComponentFixture<ThirdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
