import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondViewComponent } from './second-view.component';

describe('SecondViewComponent', () => {
  let component: SecondViewComponent;
  let fixture: ComponentFixture<SecondViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
