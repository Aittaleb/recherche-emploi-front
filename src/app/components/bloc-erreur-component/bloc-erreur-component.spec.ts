import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocErreurComponent } from './bloc-erreur-component';

describe('BlocErreurComponent', () => {
  let component: BlocErreurComponent;
  let fixture: ComponentFixture<BlocErreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlocErreurComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlocErreurComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
