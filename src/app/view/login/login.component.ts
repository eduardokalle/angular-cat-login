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

//config
import { saveData } from '../../config/secureLS/secureLs';

//interface
import { login } from "../../model/login";

//services
import { LoginService } from "../../service/login.service";


@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading = false;
  errorMessage = '';
  AppName = GlobalVariable.APP_NAME;
  rest: any;
  loginForm: FormGroup = new FormGroup({});

  loginI: login = { email: '', password: '' };

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Rest of the code...
  }


  onSubmit(): void {
    
    if (this.loginForm.valid) {

      this.loginI = { 
        email: this.loginForm.value.email, 
        password: this.loginForm.value.password 
      };
          this.loginService.login( 
            this.loginI
          ).subscribe((p) => {
              console.log(p);
              this.rest = p
              if (this.rest.data.token) {
                this.launchMessage("Ingreso correcto");
                saveData('token', this.rest.data.token);
                this.router.navigate(['/profile-user']);  
              }
              if (this.rest.data.message) {
                this.launchMessage(this.rest.data.message);
              }
              
            },(e) => {
              console.log(e);
              this.rest = e
              if (e.error.message) {
                this.launchMessage(e.error.message);
              }
            }
          );
    }
  }

  register(){
    this.router.navigate(['/register']);
  }

  getErrorMessage(component: string) {
    let errorMessage = '';
    switch (component) {
      case 'email':
        errorMessage = this.loginForm.get('email')?.hasError('required')
          ? 'campo requerido'
          : this.loginForm.get('email')?.hasError('email')
          ? 'ingresa un correo válido'
          : '';
        break;
      case 'password':
        errorMessage = this.loginForm.get('password')?.hasError('required')
          ? 'campo requerido'
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
