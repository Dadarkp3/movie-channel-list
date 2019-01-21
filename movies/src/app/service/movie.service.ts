import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl = 'https://api.themoviedb.org/3/movie/';
	private movieUrlSearch = 'https://api.themoviedb.org/3/search/movie?api_key=ba06e9d5914aec7bf90de97e78a8b482&query=';
	private apiKey = 'ba06e9d5914aec7bf90de97e78a8b482';

  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number): Observable<any> {
    return  this.http.get<any>(this.movieUrlSearch + '&language=pt-BR&query=' +  query + '&page='+page+'&include_adult=true');
  }

  searchGenre(){
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key='+ this.apiKey +'&language=pt-BR');
  }

  searchMovieByYear(year, page:number): Observable<Movie>{
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key='+ this.apiKey +'&primary_release_year=' + year + '&page=' + page + '&language=pt-BR');
  }

  searchMovieByGenre(genre, page:number): Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key='+ this.apiKey +'&with_genres=' + genre + '&page=' + page + '&language=pt-BR');
  }

  findMovieById(id: number){
    return this.http.get<any>('https://api.themoviedb.org/3/movie/'+ id +'?api_key='+ this.apiKey +'&language=pt-BR');
  }

  findTrailerbyMovieId(id: number){
    return this.http.get<any>('https://api.themoviedb.org/3/movie/'+ id +'/videos?api_key='+ this.apiKey +'&language=pt-BR');
  }

  mostPopularMovies(){
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key='+this.apiKey+'&sort_by=popularity.desc&include_adult=false&include_video=false&page=1');

  }


}
