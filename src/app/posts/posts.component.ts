import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles/articles.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  standalone: false
})
export class PostsComponent {
  constructor(private route: ActivatedRoute, private artcls: ArticlesService, private auth: AuthService) { }

  articles: any;
  authors: any;
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;

  ngOnInit() {
    this.loadArticles();
    this.loadAuthors();
    window.scrollTo(0, 0);
  }

  loadArticles() {
    this.artcls.getAll().subscribe({
      next: (res: any) => {
        this.articles = res.reverse();
        this.totalItems = this.articles.length;
      },
      error: (err: any) => {
        console.error('Error loading articles:', err);
      }
    });
  }

  loadAuthors() {
    this.auth.getAll().subscribe({
      next: (res: any) => {
        this.authors = res;
      },
      error: (err: any) => {
        console.error('Error loading authors:', err);
      }
    });
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
