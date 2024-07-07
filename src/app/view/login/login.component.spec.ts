
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import '@types/jest';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

//services
import { LoginService } from "../../service/login.service";


import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    const authServiceMock = {
      login: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: loginService, useValue: authServiceMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message for invalid credentials', () => {
    loginService.login = jest.fn().mockReturnValue(of(false));
    
    component.loginI = { email: 'test@example.com', password: 'wrongpassword' };
    component.onSubmit();
    
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(errorMessage.textContent).toContain('Invalid email or password');
  });

  it('should call AuthService login with correct credentials', () => {
    const loginSpy = jest.spyOn(loginService, 'login').mockReturnValue(of(true));
    
    component.loginI = { email: 'test@example.com', password: 'password' };
    component.onSubmit();
    
    expect(loginSpy).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
  });

  it('should not display error message for valid credentials', () => {
    loginService.login = jest.fn().mockReturnValue(of(true));

    component.loginI = { email: 'test@example.com', password: 'password' };
    component.onSubmit();
    
    fixture.detectChanges();
    
    const errorMessage = fixture.debugElement.query(By.css('p'));
    expect(errorMessage).toBeNull();
  });

});
