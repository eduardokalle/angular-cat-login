//angular 
import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { GlobalVariable } from '../../config/global';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { HttpHeaders } from '@angular/common/http';

//interface
import { register } from "../../model/register";


//services
import { RegisterService } from "../../service/register.service";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isLoading = false;
  errorMessage = '';
  AppName = GlobalVariable.APP_NAME;
  rest: any;
  registerForm: FormGroup = new FormGroup({});
  registerI: register = {  
    username: '',
    userlastname: '',
    email: '',
    phone: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      userlastname: ['', Validators.required],
      phone: ['', [Validators.required , Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Rest of the code...
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerI = { 
        username: this.registerForm.value.username,
        userlastname: this.registerForm.value.userlastname,
        phone:this.registerForm.value.phone,
        email: this.registerForm.value.email, 
        password: this.registerForm.value.password
      }
          this.registerService.register(
            this.registerI
            ).subscribe((p) => {
              console.log(p);
              this.rest = p
              if (this.rest.data.message == "User registered successfully") {
                this.launchMessage("User registered successfully");
                
              }
            },(e) => {
              console.log(e);
              this.rest = e
              this.launchMessage("Error");
             }
          );
    }
  }

  Login(){
    this.router.navigate(['/login']);
  }

  getErrorMessage(component: string) {
    let errorMessage = '';
    switch (component) {
      case 'email':
        errorMessage = this.registerForm.get('email')?.hasError('required')
          ? 'Field required'
          : this.registerForm.get('email')?.hasError('email')
          ? 'Insert email valid'
          : '';
        break;
      case 'password':
        errorMessage = this.registerForm.get('password')?.hasError('required')
          ? 'Field required'
          : '';
        break;
      case 'username':
        errorMessage = this.registerForm.get('username')?.hasError('required')
          ? 'Field required'
          : '';
        break;  
      case 'userlastname':
        errorMessage = this.registerForm.get('userlastname')?.hasError('required')
          ? 'Field required'
          : '';
        break;    
      case 'phone':
        errorMessage = this.registerForm.get('phone')?.hasError('required')
          ? 'Field required'
          : '';
        break;      
    }
    return errorMessage;
  }

  launchMessage(message: string) {
    this.errorMessage = '';
    const action = 'OK';

    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
