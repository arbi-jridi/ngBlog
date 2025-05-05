import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { ToasterService } from '../../services/toaster/toaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false
})
export class HeaderComponent {

isMenuOpen = false;
id: any;
author = computed(() => this.auth.getAuthorData());
imageLoaded = computed(() => !!this.author());

  constructor(public auth:AuthService, private router :Router,private route: ActivatedRoute, private toaster:ToasterService) { }
  ngOnInit() {
    const authorId = localStorage.getItem('authorId');
    if (authorId) {
      this.auth.getAuthorId(authorId).subscribe({
        next: (res: any) => {
          this.auth.updateAuthorData(res);
        },
        error: (err: any) => {
          console.error('Error loading author:', err);
        }
      });
    }
  }
  
  logout(){
    this.auth.logout();
    sessionStorage.removeItem('author')
    this.router.navigate(['/']);
    this.toaster.typeWarning('You have successfully Logout', 'Success');
  }

   toggle() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
