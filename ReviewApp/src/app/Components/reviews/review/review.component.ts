import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Review } from 'src/app/Models/review.model';
import { CommonService } from 'src/app/Services/common.service';
import { ReviewsService } from 'src/app/Services/reviews.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() review: Review;
  public sentiment: string;
  public icon: string;
  public textcolor: string;

  constructor(public reviewsService: ReviewsService, public userService: UserService, private router: Router, 
    private commonService: CommonService) { }

  ngOnInit(): void {
    if(this.review.polarity.valueOf() > 0){
      this.sentiment = 'Positive feedback';
      this.icon = 'fa fa-thumbs-up fa-2x';
      this.textcolor = 'positive';
    }
    else if(this.review.polarity.valueOf() < 0){
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

  deleteReview(id: string){
    if(confirm('Are you sure to delete this review?') == true){
      this.reviewsService.removeReview(id).subscribe(
        (res) => {
          this.commonService.showSuccess('Review deleted successfully', 'Review deletion');
          this.reviewsService.getReviewArray();
          this.router.navigateByUrl('/home');
        }
      )
    }

  }
}
