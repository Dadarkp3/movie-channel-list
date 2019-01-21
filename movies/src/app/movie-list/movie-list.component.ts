import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../models/movie';
import { DOCUMENT } from '@angular/platform-browser';
import { Inject} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  public movieInput: string = '';
  public debounce$ = new Subject<string>();
  public movieGenre: any;
  public movies: Movie[] = [];
  public currentPage: number = 1;
  public pageSize;
  public genreId: string;
  public total;
  public loading: boolean = false;
  public id: number;
  private sub: any;
  public p: number;

  constructor(private route: ActivatedRoute, private service: MovieService, @Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit() {
    this.searchGenre();
    this.searchMostPopular();
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    if (this.id) {
      this.genreService(this.id, 1);
    }

    this.debounce$
      .pipe(debounceTime(300))
      .pipe(distinctUntilChanged())
      .subscribe(query => this.searchMovies(query, 1));
  }

  searchMostPopular() {
    this.loading = true;
    this.service.mostPopularMovies().subscribe(response => {
      this.prepareData(response);
    });
  }

  searchMovies(searchInput, currentPage) {
    this.loading = true;
    if (this.checkYearService(searchInput)) {
      this.service.searchMovieByYear(searchInput, currentPage).pipe(debounceTime(500)
      , distinctUntilChanged()).subscribe(response => {
        this.prepareData(response);
      });
    } else if (this.checkGenreService()) {
      this.genreService(this.genreId, currentPage);
    } else {
      this.service.searchMovies(searchInput, currentPage).subscribe(response => {
        this.prepareData(response);
      });
    }
  }

  searchsendGenre(event) {
    this.genreService(event, 1);
  }

  openMovieid(event) {
    this.openMovie(event);
  }


  genreService(genreId, page) {
    this.service.searchMovieByGenre(genreId, page).subscribe(response => {
      this.prepareData(response);
    });
  }

  checkYearService(searchInput): boolean {
    return !isNaN(Number(searchInput));
  }

  checkGenreService(): boolean {
    let validation = false;
    this.movieGenre.genres.forEach(element => {
      if(this.movieInput.toLowerCase() == element.name.toLowerCase()){
        this.genreId = element.id;
        validation = true;
      }
    }); 
    return validation; 
  }

  prepareData(response){
    this.movies = [];
        response.results.forEach(element => {
        let movie = new Movie();
        movie.id = element.id;
        movie.title = element.title;
        if(element.release_date !== ""){
          movie.releaseDate = new Date(element.release_date);
        }
        if(element.poster_path !== null){
          movie.posterPath = "https://image.tmdb.org/t/p/w185" + element.poster_path;
        }else
        {
          movie.posterPath = '../../assets/img/no-image.png'
        }
        movie.popularity = element.vote_average/10;
        movie.overview = element.overview;
        if(element.genre_ids !== []){
          element.genre_ids.map( num => this.checkGenre(num, movie));
        }
        this.movies.push(movie);
      });
      this.pageSize = this.movies.length;
      this.loading = false;
      this.moveTop();
  }

  checkGenre(num, movie: Movie){
    this.movieGenre.genres.forEach(numero => {
      if(numero.id == num){
        movie.movieGenre.push(numero);
      }
    });
  }

  searchGenre(){
    this.service.searchGenre().subscribe(response => {
        this.movieGenre = response;
    });  
  }

  openMovie(id: string){
    this.router.navigate(['/movie', id]);
  }

  moveTop(){
    this.document.documentElement.scrollTop = 0;
    window.scroll(0,0);
    window.scrollTo(0,0);
  }

}
