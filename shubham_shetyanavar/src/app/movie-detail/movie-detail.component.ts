import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movies = [];
  movieId;
  isLoading: boolean = true;
  movieDet;
  constructor( public router: Router, public activateRoute: ActivatedRoute, public api: ApiService ) { }

  ngOnInit(): void {
    this.movieId = this.activateRoute.snapshot.params.id;
    this.getMovie(this.movieId);
  }

  getMovie(movieId) {
    this.movies = [];
    if (this.api.movieDetail){
      if (this.api.movieDetail.has(movieId)){
        this.movieDet = this.api.movieDetail.get(movieId);
        this.movies.push(this.movieDet);
        this.isLoading = false;
      }else{
        this.getMovieApiCall(movieId);
      }
    }else{
      this.getMovieApiCall(movieId);
    }

  }

  getMovieApiCall(movieId) {
    this.api.getMovie(movieId).subscribe(data => {
      this.isLoading = false;
      this.movies.push(data);
      this.api.movieDetail.set(movieId, data);
    });
  }
}
