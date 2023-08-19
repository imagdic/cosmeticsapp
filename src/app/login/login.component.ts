import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService){ }

  login(){
    if (this.email == ''){
      alert('Please enter email');
      return;
    }

    if (this.password == ''){
      alert('Please enter password');
      return;
    }
  }

}
