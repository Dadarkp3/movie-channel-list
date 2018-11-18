import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movieUrl = 'https://api.themoviedb.org/3/movie/';
	private movieUrlSearch = 'http://api.themoviedb.org/3/search/movie?api_key=ba06e9d5914aec7bf90de97e78a8b482&query=';
	private apiKey = '?&api_key=ba06e9d5914aec7bf90de97e78a8b482';

  constructor(private http: HttpClient) { }

  searchMovies(query: string, page: number): Observable<any> {
    return  this.http.get<any>(this.movieUrlSearch + '&language=pt-BR&query=' +  query + '&page='+page+'&include_adult=true');
  }

  searchGenre(){
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=ba06e9d5914aec7bf90de97e78a8b482&language=pt-BR');
  }

  searchMovieByYear(year, page:number): Observable<any>{
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key=ba06e9d5914aec7bf90de97e78a8b482&primary_release_year=' + year + '&page=' + page + '&language=pt-BR');
  }

  searchMovieByGenre(genre, page:number): Observable<any>{
    console.log('oi oi');
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie?api_key=ba06e9d5914aec7bf90de97e78a8b482&with_genres=' + genre + '&page=' + page + '&language=pt-BR');
  }


}
