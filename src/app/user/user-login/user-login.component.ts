import { NgForm } from '@angular/forms';
import { Component,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent  implements OnInit{
  constructor(private authService: AuthService, 
              private alertify: AlertifyService,
              private router: Router) {}

  ngOnInit(): void {
      
  }

  onLogin(loginForm: NgForm)
  {
    console.log(loginForm.value);
    const token = this.authService.authUser(loginForm.value);    
    if(token)
    {
      localStorage.setItem('token',token.userName)
      this.alertify.success("Login successful");
      this.router.navigate(['/']);
    }
    else{
      this.alertify.error("Login not successful");
    }
  }
}