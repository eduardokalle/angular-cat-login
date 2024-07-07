//angular 
import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
   FormsModule,
   FormBuilder,
   Validators,
   FormGroup,
   ReactiveFormsModule,
 } from '@angular/forms';

//config
import { saveData, getData } from '../../config/secureLS/secureLs';



@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,  
    MatDialogModule, 
    MatButtonModule,  
    FormsModule, 
    MatSelectModule, 
    ReactiveFormsModule
   ],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent implements OnInit {

  errorMessage = '';
  userForm: FormGroup = new FormGroup({});
  error: any;
  token: any;
  user: any;
  disabled: any;
 

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ){

    this.token = getData('token');
    this.user = this.getDecodedAccessToken(this.token)
    console.log(this.user);
    
  }  

  getDecodedAccessToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
    } catch (Error) {
      return null;
    }
  }
  

 async ngOnInit() {

  this.userForm = this.formBuilder.group({
    email: [ '' ],
   // password: ['',   [Validators.required]],
    username: [''],
    userlastname: [''],
    phone: [''],
  }); 

  this.setvalForm();
   
  }

  setvalForm(){
    this.userForm.patchValue({
      email: this.user.email,
     // password: this.user.password,
      username: this.user.username,
      userlastname: this.user.userlastname,
      phone: this.user.phone,
    });
  } 

  onSubmit(){

    if (this.userForm.valid) {

           
       }
    }

  
  launchMessage(message: string) {
    this.errorMessage = '';
    const action = 'OK';

    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }


}