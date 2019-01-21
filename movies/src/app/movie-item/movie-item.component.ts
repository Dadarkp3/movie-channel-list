import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../service/movie.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  public id: number;
  private sub: any;
  public movie: Movie = new Movie();
  public loading: boolean = false;

  constructor(private route: ActivatedRoute, public domSanitizer: DomSanitizer, private service: MovieService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => this.id = params['id']);
    this.searchMovieInfo();
  }
  searchMovieInfo() {
    this.loading = true;
    this.movie = new Movie();
    this.service.findMovieById(this.id).subscribe(response => {
      this.movie.id = response.id;
      this.movie.title = response.title;
      this.movie.budget = response.budget;
      this.movie.revenue = response.revenue;
      if(response.budget && response.revenue) {
        this.movie.profet = (response.revenue - response.budget).toString();
      }
      if(response.spoken_languages && response.spoken_languages[0]){
        this.movie.language = response.spoken_languages[0].name;
      }
      this.movie.originalTitle = response.original_title;
      this.movie.overview = response.overview;
      this.movie.status = response.status;
      if(response.runtime){
        this.movie.runtime = this.convertingTime(response.runtime);
      }
      if(response.release_date !== ""){
        this.movie.releaseDate = new Date(response.release_date);
      }
      if(response.poster_path !== null){
        this.movie.posterPath = "https://image.tmdb.org/t/p/w185" + response.poster_path;
      }else
      {
        this.movie.posterPath = '../../assets/img/no-image.png'
      }
      this.movie.popularity = response.vote_average/10;
      this.movie.movieGenre = response.genres;
        this.getVideo(this.movie.id);
      this.loading = false;
    });
  }

  getVideo(id){
    this.service.findTrailerbyMovieId(id).subscribe(response => {
      if(response.results && response.results[0])
      this.movie.trailer = 'https://www.youtube.com/embed/' + response.results[0].key;
    } );
  }

  convertingTime(x){
    let MINUTES = x;
    let m = MINUTES / 60;
    let h = (MINUTES-m)/60;
    return Math.round(h).toString() + ":" + (Math.round(m)<10?"0":"") + Math.round(m).toString()+ ':00';
  }

    searchGenre(id: number){
      this.router.navigate(['/home/genre/', id]);
    }
}
