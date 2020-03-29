import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieComponent } from './movie/movie.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NoResultComponent } from './no-result/no-result.component';


const routes: Routes = [
  {path: 'movie-detail/:id', component: MovieDetailComponent},
  {path: 'movie-list', component: MovieComponent},
  {path: 'search-page', component: SearchResultComponent},
  {path: 'no-result', component: NoResultComponent},
  { path: '**' , redirectTo: "/movie-list"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
