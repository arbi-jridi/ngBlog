import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrl: './author.component.css',
  standalone: false
})
export class AuthorComponent {
id: any;
author: any;
imageLoaded: boolean = false;
articles:any;

currentPage = 1;
itemsPerPage = 6;
totalItems = 0;


  constructor(private route: ActivatedRoute, private auth: AuthService,private artcls:ArticlesService) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.auth.getAuthorId(this.id).subscribe({
      next: (res: any) => {
        this.author = res;
        this.imageLoaded = true;
        console.log('Author data loaded:', this.author);
        sessionStorage.setItem('author', JSON.stringify(this.author));
      },
      error: (err: any) => {
        console.error('Error loading author:', err);
      }
    });

    this.artcls.getArticlesByAuthorId(this.id).subscribe({
      next: (res: any) => {
        this.articles= res;
        this.totalItems = this.articles.length;
        console.log('Author data loaded:', this.articles);
      },
      error: (err: any) => {
        
      }})
      window.scrollTo(0, 0);
  }



  get paginatedArticles() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.articles?.slice(startIndex, startIndex + this.itemsPerPage) || [];
  }

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }


}
