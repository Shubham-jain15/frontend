import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
   loggedinUser: string;
   constructor(private router: Router,private alertify:AlertifyService){
    this.loggedinUser = {} as string;
   }

   ngOnInit(): void {
       
   }

   loggedin()
   {
     this.loggedinUser = localStorage.getItem('token')??'';
     return this.loggedinUser;
   }

   onLogout()
   {
     localStorage.removeItem('token');
     this.alertify.success("You are logged out");
     this.router.navigate(['/user/login'])
   }
}
