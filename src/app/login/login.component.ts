import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToasterService } from '../services/toaster/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {

  constructor(private auth :AuthService,private router:Router ,private toaster:ToasterService){}
  isLoading = false;

  author = {
    email: '',
    password: ''
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  login(){
    this.isLoading = true;
    this.auth.login(this.author).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.success();
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
        this.toaster.typeError('Email or password incorrect','An error occurred');
        setTimeout(() => {
          this.isLoading = false;
        }, 10000); 
      },
      complete: () => {
        this.isLoading = false;
      } 
  });
  }


  success(){
    this.toaster.typeSuccess('You have successfully Logged in', 'Success');
  }
}
