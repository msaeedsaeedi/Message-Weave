import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  router = inject(Router);
  auth = inject(AuthenticationService);

  register(name: string, email: string, password: string): void {

    this.auth.Register(name, email, password).then((e) => {
      if (e) {
        this.router.navigate(['']);
      }
      else {
        console.log("Login Failed");
      }
    })
  }
}
