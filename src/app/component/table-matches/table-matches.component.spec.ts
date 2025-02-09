import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMatchesComponent } from './table-matches.component';

describe('TableMatchesComponent', () => {
  let component: TableMatchesComponent;
  let fixture: ComponentFixture<TableMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMatchesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
