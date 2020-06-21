import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;
  userName: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  loginError: boolean;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginform = this.fb.group(
      {
        userName: this.userName,
        password: this.password
      }
    );
  }

  ngOnInit(): void {

  }

  onSubmit() {
    // this.submitted = true;
    // if (this.loginform.valid) {
      // console.log(this.userName.value);
      const auth = this.loginService.loginUser(this.userName.value, this.password.value);
      if (auth) {
        this.router.navigate(['dashboard']);
      } else {
        this.loginform.reset();
        this.loginError = true;
      }
    // }
  }

}
