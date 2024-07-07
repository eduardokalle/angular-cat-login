import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    HomeComponent, 
    RouterOutlet, 
    MatTableModule, 
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-fe';
}
