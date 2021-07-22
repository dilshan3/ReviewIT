import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ReviewsService } from 'src/app/Services/reviews.service';
import { UserService } from 'src/app/Services/user.service';
import { MovieService } from 'src/app/Services/movie.service';

import { Review } from 'src/app/Models/review.model';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie.model';
import { FormControl } from '@angular/forms';
import { generate } from 'rxjs';
import { CommonService } from 'src/app/Services/common.service';
import { User } from 'src/app/Models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean;
  movie: Movie;
  movieName: string;
  serverErrorMessages: string = '';

  constructor(private reviewsService: ReviewsService, private userService: UserService,
    private router: Router, private movieService: MovieService, public commonService: CommonService) { }

  ngOnInit(): void {
    
    /// Checking for the user authentication
    if(this.userService.isLoggedIn()){
      this.isLoggedIn =true;
    }
    else{
      this.isLoggedIn =false;
    }

    this.userService.getUserEmail().subscribe(
      (res:any) => {
        this.userService.selectedUser.email = res.user.email;
        this.userService.selectedUser.name = res.user.name;
      },
      err => {}
    );
  }

  onSignOut(){
    this.userService.deleteToken();
    this.userService.selectedUser = new User();
    this.router.navigateByUrl('/signin');
  }

  /// Find a movie using an API call
  searchMovie(){
    if(typeof this.movieName === 'undefined' || this.movieName == ''){
      this.serverErrorMessages = 'Movie name is required';
      this.movie = new Movie()
    }
    else{
      this.movieService.searchMovie(this.movieName).subscribe(
        (res:any) => {
          if(res.Response == 'False'){
            this.serverErrorMessages = res.Error;
          }
          else{
            this.movie = {
              title: res.Title,
              year: res.Year, 
              runtime: res.Runtime,
              genre: res.Genre,
              director: res.Director,
              cast: res.Actors, 
              plot: res.Plot,
              posterUrl: res.Poster,
              imdbRating: res.imdbRating
            }
            this.serverErrorMessages = '';
          }
        },
        err => {
          this.serverErrorMessages = err.Error;
        }
      );
    }
  }

  /// To navigate to add review page
  onReviewClick(movie: Movie){
    this.movieService.setSelectedMovie(movie);
    this.reviewsService.review = new Review();
    this.router.navigateByUrl('/create');
  }
}
