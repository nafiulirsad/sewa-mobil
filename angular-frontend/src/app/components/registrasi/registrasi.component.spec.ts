import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrasiComponent } from './registrasi.component';

describe('RegistrasiComponent', () => {
  let component: RegistrasiComponent;
  let fixture: ComponentFixture<RegistrasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrasiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
