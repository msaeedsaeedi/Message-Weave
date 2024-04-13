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
  photo: File | undefined;

  router = inject(Router);
  auth = inject(AuthenticationService);

  register(name: string, email: string, password: string): void {
    this.auth.Register(name, email, password, <File>this.photo).then((e) => {
      if (e) {
        this.router.navigate(['']);
      }
      else {
        console.log("Login Failed");
      }
    })
  }

  onPhotoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.photo = (target.files as FileList)[0];
  }
}
