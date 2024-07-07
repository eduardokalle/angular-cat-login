import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListCatsComponent } from './table-list-cats.component';

describe('TableListCatsComponent', () => {
  let component: TableListCatsComponent;
  let fixture: ComponentFixture<TableListCatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableListCatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableListCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
