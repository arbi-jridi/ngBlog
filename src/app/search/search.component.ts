import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles/articles.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: false
})
export class SearchComponent implements OnInit {

  query: string = '';
  results: any[] = [];
  loading = false;
  error = '';
  currentPage = 1;
  itemsPerPage = 6;
  totalItems = 0;
  authors: any;

  constructor(private route: ActivatedRoute, private artcls: ArticlesService,private auth: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchArticles();
      }
    });
    this.loadAuthors();
    window.scrollTo(0, 0);
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

  searchArticles() {
    this.loading = true;
    this.error = '';
    this.artcls.searchArticles(this.query).subscribe({
        next: (data:any) => {
          this.results = data;
          this.loading = false;
          this.totalItems = this.results.length;
        },
        error: (err) => {
          this.error = 'Error fetching search results';
          this.loading = false;
        }
      });
  }

  highlight(text: string, search: string): string {
    if (!search) return text;
    const re = new RegExp(`(${search})`, 'gi');
    return text.replace(re, '<mark>$1</mark>');
  }
  
  getHighlightedSentence(content: string, search: string): string | null {
    if (!search) return null;
    // Split content into sentences (handles ., !, ? followed by space or end of string)
    const sentences = content.match(/[^.!?]*[.!?]/g) || [];
    // Find the first sentence containing the search term (case-insensitive)
    const found = sentences.find(sentence => new RegExp(search, 'i').test(sentence));
    return found ? this.highlight(found, search) : null;
  }

  get paginatedArticles() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.results?.slice(startIndex, startIndex + this.itemsPerPage) || [];
  }

  changePage(page: number) {
    this.currentPage = page;
    window.scrollTo(0, 0);
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}