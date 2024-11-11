import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenMobilComponent } from './manajemen-mobil.component';

describe('ManajemenMobilComponent', () => {
  let component: ManajemenMobilComponent;
  let fixture: ComponentFixture<ManajemenMobilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManajemenMobilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManajemenMobilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
