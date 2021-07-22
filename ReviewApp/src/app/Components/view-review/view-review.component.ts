import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/Services/user.service';
import { ReviewsService } from 'src/app/Services/reviews.service';
import { CommonService } from 'src/app/Services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-review',
  templateUrl: './view-review.component.html',
  styleUrls: ['./view-review.component.css']
})
export class ViewReviewComponent implements OnInit {

  public sentiment: string;
  public icon: string;
  public textcolor: string;
  public isLoggedIn: boolean;

  constructor(public reviewsService: ReviewsService, public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.userService.isLoggedIn()){
      this.isLoggedIn =true;
    }
    else{
      this.isLoggedIn =false;
    }

    if(this.reviewsService.review.polarity.valueOf() > 0){
      this.sentiment = 'Positive feedback';
      this.icon = 'fa fa-thumbs-up fa-2x';
      this.textcolor = 'positive';
    }
    else if(this.reviewsService.review.polarity.valueOf() < 0){
      this.sentiment = 'Negative feedback';
      this.icon = 'fa fa-thumbs-down fa-2x';
      this.textcolor = 'negative';
    }
    else{
      this.sentiment = 'Neutral feedback';
      this.icon = 'fa fa-meh-o fa-2x';
      this.textcolor = 'neutral';
    }
  }

  onSignOut(){
    this.userService.deleteToken();
    this.router.navigateByUrl('/signin');
  }

  onHomeClick(){
    this.router.navigateByUrl('/home');
  }

  onEditClick(){
    this.router.navigateByUrl('/create');
  }

}
