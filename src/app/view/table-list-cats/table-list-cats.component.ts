import { Component , ViewChild  } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideRouter, Router, RouterLink, TitleStrategy } from '@angular/router';

//service
import { CatsService } from "../../service/cats.service";


@Component({
  selector: 'app-table-list-cats',
  standalone: true,
  imports: [ MatButtonModule, MatToolbarModule, MatTableModule, MatPaginatorModule, MatDialogModule  , MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule,  MatDialogModule, MatButtonModule, MatToolbarModule, MatStepperModule,FormsModule,MatCheckboxModule,
    ReactiveFormsModule,],
  templateUrl: './table-list-cats.component.html',
  styleUrl: './table-list-cats.component.scss'
})
export class TableListCatsComponent {

  displayedColumns: string[] = [ 'name' ,'intelligence', "origin", 'life_span' ,'image'];
  @ViewChild(MatPaginator) paginatior !: MatPaginatorModule;

  getListCatsALL: any;
  dataSource: any;

  
  constructor(
    private catsService : CatsService
  ) { }

  ngOnInit(): void { 
    this.getListCats()
  }

  getListCats(){ this.catsService.listCats({ }).subscribe((p) => {
        console.log(p);
        this.getListCatsALL = p
        this.setObjectDataSource(this.getListCatsALL)
      },(e) => {
        console.log(e);
        this.getListCatsALL = e
      }
    );
  }

  setObjectDataSource(getListCatsALL: any) {
    this.dataSource = new MatTableDataSource(getListCatsALL);
    this.dataSource.paginator = this.paginatior;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
