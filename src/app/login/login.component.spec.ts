import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule, EmailValidator } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let debugElement: DebugElement;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
      providers: [
        LoginService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should create Login Component', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if Username is blank', () => {
    const username = component.userName;
    expect(username.valid).toBeFalsy();
    expect(username.errors.required).toBeTruthy();
    debugElement.query(By.css('#uname')).nativeElement.value = '';
    debugElement.query(By.css('#uname')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(username.errors.required).toBeTruthy();
    const span = debugElement.query(By.css('#uname-required')).nativeElement.innerHTML;
    expect(span.trim()).toEqual('Username is required');
  });

  it('should not show error if Username is valid', () => {
    const username = component.userName;
    expect(username.valid).toBeFalsy();
    expect(username.errors.required).toBeTruthy();
    debugElement.query(By.css('#uname')).nativeElement.value = 'saurabh';
    debugElement.query(By.css('#uname')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(username.errors).toBeFalsy();
  });

  it('should show error if Password is blank [Password-check]', () => {
    const password = component.password;
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
    debugElement.query(By.css('#password')).nativeElement.value = '';
    debugElement.query(By.css('#password')).nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.errors.required).toBeTruthy();
    const span = debugElement.query(By.css('#pass-required')).nativeElement.innerHTML;
    expect(span.trim()).toEqual('Password is required');
  });

  it('should not show required error if Password is not blank', () => {
    const password = component.password;
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
    const input = debugElement.query(By.css('#password')).nativeElement;
    input.value = '12345';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.errors.required).toBeFalsy();
  });

  it('should show Minlength error if Password length is less than 8 chars', () => {
    const password = component.password;
    expect(password.valid).toBeFalsy();
    expect(password.errors.required).toBeTruthy();
    const input = debugElement.query(By.css('#password')).nativeElement;
    input.value = '12345';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(password.errors.minlength).toBeTruthy();
    const span = debugElement.query(By.css('#pass-len')).nativeElement.innerHTML;
    expect(span.trim()).toEqual('Password should be 8 characters long.');
  });

  it('should enable submit button if form is valid', () => {
    const form = component.loginform;
    expect(form.valid).toBeFalsy();
    const uname = debugElement.query(By.css('#uname')).nativeElement;
    uname.value = 'saurabh';
    uname.dispatchEvent(new Event('input'));
    const password = debugElement.query(By.css('#password')).nativeElement;
    password.value = '12345678';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    const btn = debugElement.query(By.css('#submit-btn')).nativeElement;
    expect(btn.disabled).toBeFalsy();
  });

  it('should show error if user credentials are invalid', async(() => {
    spyOn(loginService, 'loginUser').and.returnValue(false);
    const form = component.loginform;
    const uname = debugElement.query(By.css('#uname')).nativeElement;
    uname.value = 'saurabh1';
    uname.dispatchEvent(new Event('input'));
    const password = debugElement.query(By.css('#password')).nativeElement;
    password.value = '12345678';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    const btn = debugElement.query(By.css('#submit-btn'));
    expect(btn.nativeElement.disabled).toBeFalsy();
    component.onSubmit();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const errormsg = debugElement.query(By.css('#invalid-creds')).nativeElement.innerHTML;
      expect(errormsg.trim()).toEqual('Invalid User or Password !!');
    });

  }));

  it('should navigate to dashboard if user credentials are valid', async(() => {
    spyOn(loginService, 'loginUser').and.returnValue(true);
    spyOn(router, 'navigate').and.stub();
    const form = component.loginform;
    const uname = debugElement.query(By.css('#uname')).nativeElement;
    uname.value = 'saurabh';
    uname.dispatchEvent(new Event('input'));
    const password = debugElement.query(By.css('#password')).nativeElement;
    password.value = '12345678';
    password.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
    const btn = debugElement.query(By.css('#submit-btn'));
    expect(btn.nativeElement.disabled).toBeFalsy();
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);

  }));

});
