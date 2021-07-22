import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReviewsService } from 'src/app/Services/reviews.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {


  constructor(public reviewsService: ReviewsService, private router: Router) {

  }

  ngOnInit(): void {
    this.reviewsService.getReviewArray();
  }

  onClickReview(id: string){
    this.reviewsService.searchReview(id).subscribe(
      (res:any) => {
        this.reviewsService.review =  res.review;
        this.router.navigateByUrl('/view');
      },
      err => {}
    )
  }

  isArrayEmpty(): boolean{
    if(this.reviewsService.reviewArray.length > 0){
      return false;
    }
    return true
  }

}
