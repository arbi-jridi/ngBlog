import { ArticlesService } from './../services/articles/articles.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster/toaster.service';
import { AuthService } from '../services/auth/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
  standalone: false
})
export class CreateArticleComponent {

  constructor(private arts :ArticlesService , private router: Router,private toaster:ToasterService,private auth:AuthService) { }
  image: any;
  isLoading = false;

select(event: any){
  this.image = event.target.files[0];
  }
  
  article :any = 
  {
  title: '',
  description: '',
  content: '',
  tags:[]
  }

tag: any = '';

get tagsValid(): boolean {
  return this.article.tags?.length > 0;
}

  success(){
    this.toaster.typeSuccess('Article created successfully', 'Success');
  }
  create() {
    if (this.isLoading) return;
    
    this.isLoading = true;
    let fd = new FormData();
    fd.append('idAuthor', this.auth.getAuthorDataFromToken()._id);
    fd.append('title', this.article.title);
    fd.append('description', this.article.description);
    fd.append('content', this.article.content);
    fd.append('tags', this.article.tags.toString());
    fd.append('image', this.image);
  
    this.arts.create(fd).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.success();
        this.router.navigate(['/']);
        console.log(res);
      },
      error: (error: any) => {
        console.error(error);
        this.toaster.typeError('OOPS !', 'An error has occurred');
        setTimeout(() => {
          this.isLoading = false;
        }, 20000); 
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
 
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  editorConfig: AngularEditorConfig = {
      editable: true,
        spellcheck: true,
        height: '150px',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],
        customClasses: [
        {
          name: 'quote',
          class: 'quote',
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: 'titleText',
          class: 'titleText',
          tag: 'h1',
        },
      ],
      uploadUrl: 'v1/image',
      uploadWithCredentials: false,
      sanitize: true,
      toolbarPosition: 'top',
  };
}