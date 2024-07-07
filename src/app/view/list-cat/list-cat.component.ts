import { Component, OnInit, ViewChild, Input, OnChanges, Output, SimpleChanges  } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

import { provideRouter, Router, RouterLink, TitleStrategy } from '@angular/router';

//service
import { CatsService } from "../../service/cats.service";

@Component({
  selector: 'app-list-cat',
  standalone: true,
  imports: [ MatButtonModule, MatCardModule ,NgIf ,NgFor,  MatToolbarModule, MatDialogModule  , MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule,  MatDialogModule, MatButtonModule, MatToolbarModule, MatStepperModule,FormsModule,MatCheckboxModule,
    ReactiveFormsModule,],
  templateUrl: './list-cat.component.html',
  styleUrl: './list-cat.component.scss'
})
export class ListCatComponent {

  errorMessage = '';
  FormGroup:any;
  listCats: any;
  visibleCard: boolean = false;
  getListCatsALL: any;
  ListCatsSelect: any;
  ListCatsSelectIMG: any;
  selectedItemId: any;
  currentIndex: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private catsService : CatsService
  ) { }


  ngOnInit(): void {
    console.log(this.visibleCard);
    this.getListCats()
    this.FormGroup = this._formBuilder.group({
      list: [''],
    });

  }

  onSelectionChange(event: any) {
    this.selectedItemId = event.value;
    this.getListCatsID(this.selectedItemId);
    this.getListCatsIDIMG(this.selectedItemId);
    
  }

   getListCats(){ this.catsService.listCats({ }).subscribe((p) => {
        console.log(p);
        this.getListCatsALL = p.data
        
      },(e) => {
        console.log(e);
        this.getListCatsALL = e
      }
    );
   }

   getListCatsID(data: any){
     this.catsService.getCatBreedsid({data}).subscribe((p) => {
      console.log(p);
      this.ListCatsSelect = p.data
      if (p) {
          this.visibleCard = true;
      }
    },(e) => {
      console.log(e);
      this.ListCatsSelect = e
    }
   );
  }

  getListCatsIDIMG(data: any){
    this.catsService.getImagenforbreed({data}).subscribe((p) => {
     console.log(p);
     this.ListCatsSelectIMG = p.data
   },(e) => {
     console.log(e);
     this.ListCatsSelectIMG = e
   }
  );
 }

 next(): void {
  this.currentIndex = (this.currentIndex + 1) % this.ListCatsSelectIMG.length;
}

previous(): void {
  this.currentIndex = (this.currentIndex - 1 + this.ListCatsSelectIMG.length) % this.ListCatsSelectIMG.length;
}

  launchMessage(message: string) {
    this.errorMessage = '';
    const action = 'OK';

    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
