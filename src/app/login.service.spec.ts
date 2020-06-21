import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user with valid credentials', () => {
    const uname = 'saurabh';
    const password = '12345678';
    expect(service.loginUser(uname, password)).toBeTruthy();
  });

  it('should not allow user login with invalid credentials', () => {
    const invaliduname = 'saurabh1';
    const password = '12345678';
    expect(service.loginUser(invaliduname, password)).toBeFalsy();
  });

  it('should Logout user', () => {
    expect(service.logoutUser()).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem('auth', 'true');
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    localStorage.setItem('auth', 'false');
    expect(service.isLoggedIn()).toBeFalsy();
  });

});
