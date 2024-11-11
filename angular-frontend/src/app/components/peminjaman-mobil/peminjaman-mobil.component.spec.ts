import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeminjamanMobilComponent } from './peminjaman-mobil.component';

describe('PeminjamanMobilComponent', () => {
  let component: PeminjamanMobilComponent;
  let fixture: ComponentFixture<PeminjamanMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeminjamanMobilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeminjamanMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
