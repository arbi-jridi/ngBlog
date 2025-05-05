import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ArticlesService } from '../services/articles/articles.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  standalone: false
})
export class AboutComponent {
  authors: any[] = [];
  articles: any[] = [];
    backgroundImage: string=''; 

  constructor(private auth: AuthService,private artcls: ArticlesService) {
    
  }
  async ngOnInit() {
    window.scrollTo(0, 0);
    this.loadAuthors();
    this.loadArticles();
    const response = await fetch('https://api.unsplash.com/photos/random?query=blogger&orientation=landscape&client_id=nXG7Xv4nc6fOMsNxP_B-3szAxHyRvaLnX0IzWZzEtio');
    const data = await response.json();
    this.backgroundImage = data.urls.regular;
  }
  loadAuthors() {
    this.auth.getAll().subscribe({
      next: (res: any) => {
        this.authors = res;
        console.log(this.authors);
      },
      error: (err: any) => {
        console.error('Error loading authors:', err);
      }
    });
  }
  loadArticles() {
    this.artcls.getAll().subscribe({
      next: (res: any) => {
        this.articles = res;
        console.log(this.articles)
      },
      error: (err: any) => {
        console.error('Error loading articles:', err);
      }
    });
  }

  getAuthorArticleCount(id:number){
    return this.articles.filter(article=>article.idAuthor==id).length
  }

}
