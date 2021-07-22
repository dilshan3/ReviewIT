import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Movie } from '../Models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  public selectedMovie: Movie;

  constructor(private http: HttpClient) { }

  searchMovie(name: string){
    return this.http.get(environment.omdbApiUrl + environment.omdbApiKey + '&t=' + name);
  }

  setSelectedMovie(movie: Movie){
    this.selectedMovie = movie;
  }
}
