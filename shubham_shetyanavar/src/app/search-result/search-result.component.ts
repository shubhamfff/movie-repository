import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  searchResult;
  isLoading = true;
  searchText;

  constructor(private api: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.searchResult = this.api.searchResult;
    this.searchListLoaded();
    this.searchText = this.api.searchText;
  }

  searchListLoaded() {
    if(this.api.searchResult){
      this.isLoading = false;
      this.searchResult = this.api.searchResult;
    }
  }

  movieClicked(item){
    this.router.navigate(['movie-detail/' + item.id]);
    // console.log(item.id);
  }
}
