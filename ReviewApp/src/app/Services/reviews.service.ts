import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Review } from '../Models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  public review: Review = new Review();
  public reviewArray: Review[] = [];

  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'true'})};

  constructor(private http: HttpClient) { }

  /// Retrieves all reviews
  getAllReviews(){
    return this.http.get(environment.apiBaseUrl + '/reviews');
  }

  /// Retrieve one review
  searchReview(id: string){
    return this.http.get(environment.apiBaseUrl + '/reviews/' + id);
  }

  /// Get review sentiment
  getReviewSentiment(review: string){
    let body = `text=${review}`;
    return this.http.post(environment.twinwordApiUrl, body);
  }

  /// Post new review
  saveReview(review: Review){
    return this.http.post(environment.apiBaseUrl+'/reviews/', review);
  }

  /// Update review
  updateReview(review: Review){
    return this.http.put(environment.apiBaseUrl+'/reviews/' + review._id, review);
  }

  /// Get all reviews to array
  getReviewArray(){
    this.http.get(environment.apiBaseUrl + '/reviews').subscribe(
      (res: any) => {
        this.reviewArray = res.reviews;
      },
      err => {

      }
    )
  }

  /// Delete a review
  removeReview(id: string){
    return this.http.delete(environment.apiBaseUrl + '/reviews/' + id);
  }
}
