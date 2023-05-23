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
    password: ""
  };

  errorMessage = "";

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    console.log("Welcome to T-Hub");
  }

  onSubmit(): void{
    const { username, email, password} = this.form;

    this.authService.register(username, email,password).subscribe({
      next: (data: any) => {
        this.reloadPage();
      },
      error: (err: any) => {
        this.errorMessage = err.error.message;
      }
    });
  }

  reloadPage(): void {
    this.router.navigate(["login"]);
  }

}
