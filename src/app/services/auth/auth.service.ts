
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID,signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environment/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authorDataSignal = signal<any>(null);
  isLoggedIn = computed(() => !!this.authorDataSignal());

  constructor(private htttp:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) { }

  
   private url = environment.authUrl;

  updateAuthorData(data: any) {
    this.authorDataSignal.set(data);
  }


  getAuthorData() {
    return this.authorDataSignal();
  }


  register(author:any){
    return this.htttp.post(this.url+'register', author);
  }

  login(author: any) {
    return this.htttp.post(this.url + 'login', author).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.mytoken);
        const tokenData = this.getAuthorDataFromToken();
        if (tokenData && tokenData._id) {
          localStorage.setItem('authorId', tokenData._id);
          this.getAuthorId(tokenData._id).subscribe(authorData => {
            this.updateAuthorData(authorData);
          });
        }
      })
    );
  }



  isLogged() {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false; 
  }

  logout(){
      localStorage.removeItem('token');
      localStorage.removeItem('authorId');
  }

  getAuthorDataFromToken(){
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token');
      let payload;
      if(token){
        payload = token.split('.')[1];
        payload = window.atob(payload);
        return JSON.parse(payload);
      }else{
        return null;
      }
    }
  }

  getAuthorId(id:any){
    return this.htttp.get(this.url+'getbyid/'+id);
  }

  getAll(){
    return this.htttp.get(this.url+'all/');
  }

}
