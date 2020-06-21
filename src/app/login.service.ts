import { Injectable } from '@angular/core';

const users = {
  saurabh: '12345678'
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginUser(uname, password) {
    if (users[uname] && users[uname] === password) {
      localStorage.setItem('auth', 'true');
      return true;
    }
    return false;
  }

  logoutUser() {
    localStorage.setItem('auth', 'false');
    return true;
  }

  isLoggedIn() {
    if (localStorage.getItem('auth') === 'true') {
      return true;
    }
    return false;
  }
}
