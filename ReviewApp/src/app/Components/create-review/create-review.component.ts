import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/Services/user.service';
import { ReviewsService } from 'src/app/Services/reviews.service';
import { MovieService } from 'src/app/Services/movie.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Review } from 'src/app/Models/review.model';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  isLoggedIn: boolean; 
  isSubmitted: boolean = false;
  showSuccessMsg: boolean;
  serverErrorMsg: string;

  reviewForm = new FormGroup({

    id: new FormControl(),
    review: new FormControl('', Validators.required),
    sentiment: new FormControl('')
  })

  constructor(private router: Router, private userService: UserService, public reviewsService: ReviewsService,
    private movieService: MovieService, private commonService: CommonService) { }

  ngOnInit(): void {
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
    this.router.navigateByUrl('/signin');
  }

  onHomeClick(){
    this.router.navigateByUrl('/home');
  }

  onAnalyzeClick(){
    this.isSubmitted=true;

    if(this.reviewForm.valid){
      this.reviewsService.getReviewSentiment(this.reviewForm.get('review')!.value).subscribe(
        (res: any) => {
          var sentiment = res.result.type[0].toUpperCase() + res.result.type.slice(1);
          this.reviewForm.controls.sentiment.setValue(sentiment);
          this.reviewsService.review.polarity = res.result.polarity;
          this.reviewsService.review.sentiment = sentiment;
        }
      );
    }  
  }

  onSubmit(){
    this.isSubmitted=true;

    if(this.reviewForm.valid){

      if(this.reviewsService.review._id == undefined){
        this.reviewsService.review.movie = this.movieService.selectedMovie.title;
        this.reviewsService.review.addedDate =  new Date;
        this.reviewsService.review.posterUrl = this.movieService.selectedMovie.posterUrl;
        this.reviewsService.review.reviewer = this.userService.selectedUser.name;
        this.reviewsService.saveReview(this.reviewsService.review).subscribe(
          res => {
            this.resetForm();
            this.commonService.showSuccess('Review added successfully', 'Add Review');
            this.router.navigateByUrl('home');
            this.isSubmitted=false;
          },
          err => {
            if(err.status == 422){
              this.serverErrorMsg = err.error.join('<br/>')
            }
            else
              this.serverErrorMsg = "Something went wrong. Please contact administrator.";
          }
        );
      }
      else{
        this.reviewsService.updateReview(this.reviewsService.review).subscribe(
          res => {
            this.resetForm();
            this.commonService.showSuccess('Review updated successfully', 'Edit Review');
            this.router.navigateByUrl('home');
            this.isSubmitted=false;
          },
          err => {
            if(err.status == 422){
              this.serverErrorMsg = err.error.join('<br/>')
            }
            else
              this.serverErrorMsg = "Something went wrong. Please contact administrator.";
          }
        );
      }
      
    }
  }

  resetForm(){
    this.reviewsService.review = {
      _id: '',
      movie: '',
      reviewer: '',
      content: '',
      sentiment: '',
      polarity: 0,
      addedDate: new Date,
      lastUpdate: new Date,
      posterUrl: '',
    };
    this.serverErrorMsg = '';
    this.reviewForm.controls.review.setValue('');
    this.reviewForm.controls.sentiment.setValue('');
  }
}
