import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {}

  loginWithEmail() {
    const email = this.loginForm.value.email!;
    const password = this.loginForm.value.password!;
  
    this.authService.login({ email, password })
      .then((res: any) => {
        this.router.navigateByUrl('/');
      })
      .catch((error: any) => {
        console.error(error);
        alert('User does not exist. Please register first!');
        this.router.navigate(['/login']);
      });
  }
}
