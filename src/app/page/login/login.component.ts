import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  auth = inject(AuthenticationService);
  router = inject(Router);

  email: string = '';
  password: string = '';
  login(email: string, password: string) {

    this.auth.Login(email, password).then((e) => {
      if (e) {
        this.router.navigate(['']);
      }
      else {
        console.log("Login Failed");
      }
    });
  }
}
