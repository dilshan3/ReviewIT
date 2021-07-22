// Built-in imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
import { UserComponent } from './Components/user/user.component';
import { SignupComponent } from './Components/user/signup/signup.component';

// Routes
import { appRoutes } from './routes';
import { HeaderComponent } from './Components/header/header.component';
import { SigninComponent } from './Components/user/signin/signin.component';
import { HomeComponent } from './Components/home/home.component';
import { UserService } from './Services/user.service';

// Other imports
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { ReviewsService } from './Services/reviews.service';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { ReviewComponent } from './Components/reviews/review/review.component';
import { CreateReviewComponent } from './Components/create-review/create-review.component';
import { ViewReviewComponent } from './Components/view-review/view-review.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignupComponent,
    HeaderComponent,
    SigninComponent,
    HomeComponent,
    ReviewsComponent,
    ReviewComponent,
    CreateReviewComponent,
    ViewReviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule, ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, UserService, AuthGuard, ReviewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
