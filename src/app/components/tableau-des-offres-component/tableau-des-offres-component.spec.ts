import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDesOffresComponent } from './tableau-des-offres-component';

describe('TableauDesOffresComponent', () => {
  let component: TableauDesOffresComponent;
  let fixture: ComponentFixture<TableauDesOffresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauDesOffresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableauDesOffresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
