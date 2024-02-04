import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { User } from 'src/app/model/user';
import * as alertyfy from 'alertifyjs';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  registerationForm: FormGroup;
  user: User;
  userSubmitted: boolean = false;
  constructor(private fb: FormBuilder, 
              private userService: UserServiceService,
              private alertify:AlertifyService ) {
    this.registerationForm = {} as FormGroup;
    this.user = {} as User;
  }

  ngOnInit()
  {
    this.createRegistrationForm();
  }

  createRegistrationForm()
  {
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email:[null,[Validators.required,Validators.email]],
      password: [null,[Validators.required,Validators.minLength(8)]],
      confirmPassword: [null,[Validators.required]],
      mobile: [null,[Validators.required,Validators.maxLength(10)]]
    },{validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
      { notmatched: true };
  }  

  onSubmit(){
    console.log(this.registerationForm.value);
    this.userSubmitted = true;
    if(this.registerationForm.valid)
    {    
      //this.user = Object.assign(this.user,this.registerationForm.value);    
      this.userService.addUser(this.userData());
      this.registerationForm.reset();
      this.userSubmitted = false;
      this.alertify.success("Congrats, you are successfully registered");
    }  
    else
    {
      this.alertify.error("Please provide required details");
    }
  }

  userData() : User
  {
    return this.user = {
      userName: this.userName.value, //calling the function
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

  get userName()
  {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email()
  {
    return this.registerationForm.get('email') as FormControl;
  }

  get password()
  {
    return this.registerationForm.get('password') as FormControl;
  }

  get confirmPassword()
  {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }

  get mobile()
  {
    return this.registerationForm.get('mobile') as FormControl;
  }

  
}