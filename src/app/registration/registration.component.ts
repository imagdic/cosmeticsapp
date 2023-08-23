import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm = this.fb.group({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {

  }

  registerWithEmail() {
    console.log(this.registerForm.value);
  
    const email = this.registerForm.value.email!;
    const password = this.registerForm.value.password!;
  
    this.authService.register({ email, password })
      .then((res: any) => {
        this.router.navigateByUrl('/');
      })
      .catch((error: any) => {
        console.error(error);
        alert('Something went wrong');
        this.router.navigate(['/login']);
      });
  }
}
