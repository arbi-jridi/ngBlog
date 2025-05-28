import { ToasterService } from './../services/toaster/toaster.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles/articles.service';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { Toast } from 'ngx-toastr';
import { SocialService } from '../services/social/social.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  standalone: false
})
export class DetailComponent {

id: any;
article: any = {};
articles: any = [];
imageLoaded: boolean = false;
authorId: any;
userId: any;
author: any = {};
canDelete: boolean = false;
isLoggedIn = false;
isLoading = false;

newComment = {
  reader: '',
  email: '',
  content: ''
};


constructor(private route: ActivatedRoute ,private artcs:ArticlesService, private auth :AuthService,private router:Router,private toastr: ToasterService,private socialShare: SocialService) { }
ngAfterViewInit() {
  this.scrollTop();
  this.artcs.getAll().subscribe({
    next: (res: any) => {
      let num=Math.floor(res.length - Math.random() * res.length);
      this.articles = res.slice(num,num+2);
    },
  })
}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.artcs.getOne(this.id).subscribe({
        next: (res: any) => {
          this.article = res;
          this.imageLoaded = true;
          this.authorId = this.article.idAuthor;
          this.canDeletePost();
          this.auth.getAuthorId(this.authorId).subscribe({
            next: (authorRes: any) => {
              this.author = authorRes;
              sessionStorage.setItem('author', JSON.stringify(this.author));
            },
            error: (authorErr: any) => {
              console.error('Error loading author:', authorErr);
            }
          });
        },
        error: (err: any) => {
          console.error('Error loading article:', err);
        }
      });  
    });
    
    this.artcs.getAll().subscribe({
      next: (res: any) => {
        let num=Math.floor(res.length - Math.random() * res.length);
        this.articles = res.slice(num,num+2);
      },
    })
    this.scrollTop();
    this.newComment.reader = this.auth.getAuthorDataFromToken().fullName || '';
    this.newComment.email = this.auth.getAuthorDataFromToken().email || '';
    this.isLoggedIn = this.auth.isLogged();
  }

scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

jumptoComments(){
  const commentsSection = document.getElementById('comments-area');
  if (commentsSection) {
    commentsSection.scrollIntoView({ behavior: 'smooth' });
  }
}

  deletePost(id:any){
    this.artcs.delete(id).subscribe({
      next:(res:any)=>{
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }
  canDeletePost() {
    this.userId = localStorage.getItem('authorId');
    if(this.userId == this.authorId) {
      this.canDelete = true;
    } else {
      this.canDelete = false;
    }
  }

confirmDelete(id: any) {
  Swal.fire({
    title: "Delete this post ?",
    color: "#d33",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#808080",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      this.deletePost(id);
      Swal.fire({
        title: "Deleted!",
        text: "The Blog has been deleted.",
        icon: "success"
      });
      this.router.navigate(['/']);
    }
  });
}

addComment() {
  if (this.isLoading) return;
    
    this.isLoading = true;
  this.artcs.addComment(this.article._id, this.newComment).subscribe({
    next: (res) => {
      this.isLoading = false;
      this.article = res;
      this.newComment = { reader: '', email: '', content: '' };
      this.toastr.typeSuccess('Comment Added successfully ', 'Success');
    },
    error: (err) => {
      this.toastr.typeError('Error while Commenting Post',  err.message || 'An error occurred')
      setTimeout(() => {
        this.isLoading = false;
      }, 30000); 
    },
    complete: () => {
      this.isLoading = false;
    } 
  });
}

likeArticle() {
  this.artcs.likeArticle(this.article._id).subscribe({
    next: (res) => {
      this.article = res;
      this.toastr.typeInfo('🤍', 'Liked');
    },
    error: (err) => {
      this.toastr.typeError('Error while Liking Post',  err.message || 'An error occurred')}
  });
}

showShareModal = false;
sharePlatform: 'facebook' | 'linkedin' | 'twitter' |null = null;

openShareModal(platform: 'facebook' | 'linkedin' | 'twitter') {
  this.sharePlatform = platform;
  this.showShareModal = true;
}

closeShareModal() {
  this.showShareModal = false;
  this.sharePlatform = null;
}

shareNow() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(this.article.title);
  let shareUrl = '';
  if (this.sharePlatform === 'facebook') {
   this.shareOnFacebook();
  } else if (this.sharePlatform === 'linkedin') {
    this.shareOnLinkedIn();
  }
  else {
    this.shareOnTwitter();
  }
 /*  window.open(shareUrl, '_blank', 'width=600,height=400'); */
  this.closeShareModal();
}

shareOnFacebook() {
  this.socialShare.shareOnFacebook(this.article);
}

shareOnTwitter() {
  this.socialShare.shareOnTwitter(this.article);
}

shareOnLinkedIn() {
  this.socialShare.shareOnLinkedIn(this.article);
}
}
