import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private baseShareUrl = 'https://ngblog-2025.web.app/share';

  generateShareUrl(article: any): string {
    return `${this.baseShareUrl}?` +
      `title=${encodeURIComponent(article.title)}&` +
      `description=${encodeURIComponent(article.description)}&` +
      `image=${encodeURIComponent(article.image)}&` +
      `redirect=${encodeURIComponent(`/detail/${article._id}`)}`;
  }

  shareOnFacebook(article: any) {
    const url = this.generateShareUrl(article);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  }

  shareOnTwitter(article: any) {
    const url = this.generateShareUrl(article);
    const text = encodeURIComponent(article.title);
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  }

  shareOnLinkedIn(article: any) {
    const url = this.generateShareUrl(article);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  }

  constructor() { }
}
