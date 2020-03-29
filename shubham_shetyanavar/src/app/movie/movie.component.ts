import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  list;
  searchText;
  slides: any = [[]];
  isLoading = true;

  constructor(private api: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.getMovieList();
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  getMovieList() {
    if (this.api.homePageListData){
      this.list = this.api.homePageListData;
      this.slides = this.chunk(this.list, 4);
      this.isLoading = false;
    }else {
      this.api.getAllMovies().subscribe( (data: any) => {
        this.list = data.results;
        this.api.homePageListData = data.results;
        this.slides = this.chunk(this.list, 4);
        this.isLoading = false;
      });
    }
  }

  movieClicked(item){
    this.router.navigate(['movie-detail/' + item.id]);
    // console.log(item.id);
  }

  searchMovie() {
    // if (this.api.searchText === this.searchText) {
    //   this.router.navigate(['/search-page']);
    // }else {
    //   this.searchApiCall();
    // }

    let searchVal;
    if (this.api.searchResultMap){
      if (this.api.searchResultMap.has(this.searchText)){
        searchVal = this.api.searchResultMap.get(this.searchText);
        this.api.searchResult = searchVal;
        this.router.navigate(['/search-page']);
      }
      else{
        this.searchApiCall();
      }
    }else{
      this.searchApiCall();
    }
  }

  searchApiCall() {
    this.api.searchMovies(this.searchText).subscribe((data: any) => {
      if (data.results.length > 0){
        this.api.searchResult = data.results;
        this.router.navigate(['/search-page']);
        this.api.searchText = this.searchText;
        this.api.searchResultMap.set(this.searchText, data.results);
      }else{
        this.router.navigate(['no-result']);
      }
    });
  }
}
