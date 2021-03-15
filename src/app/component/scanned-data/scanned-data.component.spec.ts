import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScannedDataComponent } from './scanned-data.component';

describe('ScannedDataComponent', () => {
  let component: ScannedDataComponent;
  let fixture: ComponentFixture<ScannedDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScannedDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScannedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
