import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengembalianMobilComponent } from './pengembalian-mobil.component';

describe('PengembalianMobilComponent', () => {
  let component: PengembalianMobilComponent;
  let fixture: ComponentFixture<PengembalianMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengembalianMobilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengembalianMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
