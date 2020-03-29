import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  homePageListData;
  movieDetail = new Map();
  movieDet;
  searchResultMap = new Map();
  searchResult;
  searchText: any;

  constructor(public http: HttpClient) { }

  listUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=e6171b13d4159aa39793cc0b447bbb93&sort_by=popularity.desc';
  getMovieUrl = 'https://api.themoviedb.org/3/movie/';
  searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=e6171b13d4159aa39793cc0b447bbb93&language=undefined&query='

  getAllMovies(): Observable<any> {
    return this.http.get(this.listUrl);
  }

  getMovie(movie): Observable<any> {
    return this.http.get(this.getMovieUrl + movie + '?api_key=e6171b13d4159aa39793cc0b447bbb93&sort_by=popularity.desc');
  }

  searchMovies(text): Observable<any> {
    return this.http.get(this.searchUrl + text);
  }

}
