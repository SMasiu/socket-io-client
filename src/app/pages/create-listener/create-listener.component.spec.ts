import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListenerComponent } from './create-listener.component';

describe('CreateListenerComponent', () => {
  let component: CreateListenerComponent;
  let fixture: ComponentFixture<CreateListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateListenerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
