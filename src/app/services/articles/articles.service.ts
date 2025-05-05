
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID,signal, computed } from '@angular/core';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

 
  private url = environment.articleUrl;
  
  constructor(private http:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  create(article:any){
    return this.http.post(this.url+'create', article);
  }

  getAll() {
    return this.http.get(this.url+'all');
  }

  getArticlesByAuthorId(id:any) {
    return this.http.get(this.url+'getArticlesByAuthor/'+id);
  }

  getOne(id:any){
    return this.http.get(this.url+'getbyid/'+id);
  }

  delete(id:any){
    return this.http.delete(this.url+'delete/'+id); 
  }

  addComment(articleId: string, comment: any) {
    return this.http.put(`${this.url}/${articleId}/comment`, comment);
  }
  
  likeArticle(articleId: string) {
    return this.http.put(`${this.url}/${articleId}/like`, {});
  }

}
