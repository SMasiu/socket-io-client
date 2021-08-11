import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenerEventOutputComponent } from './listener-event-output.component';

describe('ListenerEventOutputComponent', () => {
  let component: ListenerEventOutputComponent;
  let fixture: ComponentFixture<ListenerEventOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenerEventOutputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListenerEventOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
