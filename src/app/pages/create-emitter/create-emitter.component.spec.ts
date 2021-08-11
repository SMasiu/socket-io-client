import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmitterComponent } from './create-emitter.component';

describe('CreateEmitterComponent', () => {
  let component: CreateEmitterComponent;
  let fixture: ComponentFixture<CreateEmitterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmitterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
