import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  form: any = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  errorMessage = "";

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    console.log("Welcome to T-Hub");
  }

  isPasswordMatch(): boolean {
    return this.form.passwordConfirmation === this.form.password;
  }

  onSubmit(): void {
    if (this.isPasswordMatch()) {
      const { username, email, password } = this.form;
      console.log(this.form);

      this.authService.register(username, email, password).subscribe({
        next: (data: any) => {
          this.refreshPage();
        },
        error: (err: any) => {
          this.errorMessage = err.error.message;
        }
      });
    } else {
      console.log("Las contraseñas no coinciden");
    }
  }


  refreshPage(): void {
    this.router.navigate(["home"]);
  }

}
