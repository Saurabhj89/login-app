import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [LoginService]
    });
    guard = TestBed.inject(AuthGuard);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow route if user is logged in', () => {
    spyOn(loginService, 'isLoggedIn').and.returnValue(true);
    expect(guard.canActivate({} as any, {} as any)).toBeTruthy();
  });

  it('should block route and redirect to login if user is not logged in', () => {
    spyOn(loginService, 'isLoggedIn').and.returnValue(false);
    spyOn(router, 'navigate').and.stub();
    expect(guard.canActivate({} as any, {} as any)).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

});
