import { ArticlesService } from '../../services/articles/articles.service';
import { Component } from '@angular/core';

declare var $: any;



@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrl: './cover.component.css',
  standalone: false
})


export class CoverComponent  {


  constructor(private arts :ArticlesService) {}


articles: any ;
backgroundImage: string='';
async ngOnInit() {
  this.arts.getAll().subscribe(
    (res:any)=>{
      let one =Math.floor(Math.random() * (res.length));
      let two =Math.floor(Math.random() * (res.length));
      let three =Math.floor(Math.random() * (res.length));
      let num =[res[one],res[two],res[three]];

      this.articles = num;
    console .log(this.articles,num);
  }, (error: any) => {
    console.error(error);
  });
  const response = await fetch('https://api.unsplash.com/photos/random?query=office&orientation=landscape&client_id=nXG7Xv4nc6fOMsNxP_B-3szAxHyRvaLnX0IzWZzEtio');
    const data = await response.json();
    this.backgroundImage = data.urls.regular;


      window.scrollTo(0, 0);
 
}




}
