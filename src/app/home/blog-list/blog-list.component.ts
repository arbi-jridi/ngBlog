import { Component } from '@angular/core';
import { ArticlesService } from '../../services/articles/articles.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.css',
  standalone: false
})
export class BlogListComponent {
  
  constructor(private arts :ArticlesService) {}


recent: any ;
all:any;
readed:any;
featured:any;

backgroundImage: string='';
async ngOnInit() {
  this.arts.getAll().subscribe(
    (res:any)=>{
    let num=Math.floor(res.length - Math.random() * res.length);
    this.featured = res.slice(num,3);
    this.recent = res.reverse().slice(0,3);
    this.all = res.reverse().slice(0,6);
    this.readed = res.slice(0,2);
    
  }, (error: any) => {
    console.error(error);
  });
    window.scrollTo(0, 0);
}

}
