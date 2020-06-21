import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let debugElement: DebugElement;
  let loginService: LoginService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [RouterTestingModule],
      providers: [LoginService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);

  });

  it('should create Dashboard Component', () => {
    expect(component).toBeTruthy();
  });

  it('should show logout link on dashboard page', () => {
    const link = debugElement.query(By.css('#logout'));
    expect(link.nativeElement.innerHTML.trim()).toEqual('Logout');
  });

  it('should logout user on click of logout', () => {
    spyOn(loginService, 'logoutUser').and.stub();
    spyOn(router, 'navigate').and.stub();
    const link = debugElement.query(By.css('#logout'));
    link.triggerEventHandler('click', {});
    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });

});
