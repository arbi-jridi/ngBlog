import { Component, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private sliderInitialized = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    // Handle route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter(() => this.router.url.includes('/')) 
    ).subscribe(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.reinitSlider();
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSlider();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.destroySlider();
    }
  }

  private reinitSlider() {
    this.destroySlider();
    setTimeout(() => this.initializeSlider(), 50); 
  }

  private initializeSlider() {
    if (!this.sliderInitialized) {
      $('.banner-slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
      });
      this.sliderInitialized = true;
    }
  }

  private destroySlider() {
    if (this.sliderInitialized && $('.banner-slider').hasClass('slick-initialized')) {
      $('.banner-slider').slick('unslick');
      this.sliderInitialized = false;
    }
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}