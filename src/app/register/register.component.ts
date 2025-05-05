import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToasterService } from '../services/toaster/toaster.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent {
  constructor(private auth :AuthService , private router: Router,private toaster:ToasterService) { }

  isLoading = false;

author ={
  name: '',
  lastName: '',
  email: '',
  password: '',
  about: '',
  linkedin: '',
}

image: any;
select(event: any){
  this.image = event.target.files[0];
}

register(){
  this.isLoading = true;
  let fd = new FormData();
  fd.append('name', this.author.name);
  fd.append('lastName', this.author.lastName);
  fd.append('email', this.author.email);  
  fd.append('password', this.author.password);
  fd.append('about', this.author.about);
  fd.append('linkedin', this.author.linkedin);
  fd.append('image', this.image);
  this.auth.register(fd).subscribe({
    next: (res: any) => {
    this.isLoading = false;
    this.success();
    this.router.navigate(['/login']);
    console.log(res);
  } , error: (err: any) => {
    console.error(err);
    this.toaster.typeError('An error has occurred', 'Error while Registering');
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
    this.toaster.typeSuccess('You have successfully registered', 'Success');
  }


}
