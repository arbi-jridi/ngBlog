import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AboutComponent } from './about/about.component';
import { AuthorComponent } from './author/author.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoverComponent } from './home/cover/cover.component';
import { BlogListComponent } from './home/blog-list/blog-list.component';
import { ContactComponent } from './contact/contact.component';
import { PostsComponent } from './posts/posts.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; 
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { StripHtmlPipe } from './pipes/strip-html.pipe';
import { environment } from '../environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    AuthorComponent,
    CreateArticleComponent,
    DetailComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    CoverComponent,
    BlogListComponent,
    ContactComponent,
    PostsComponent,
    StripHtmlPipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    FormsModule,
     HttpClientModule,
     BrowserAnimationsModule,
     RouterModule,
     AngularEditorModule,
     SlickCarouselModule,
     AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    provideClientHydration(),
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
