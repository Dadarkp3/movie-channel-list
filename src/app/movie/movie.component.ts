import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../models/movie';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() 
  public movie: Movie;

  @Output()
  selectGenre: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  openMovie: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  sendGenre(id: string){
    this.selectGenre.emit(id);
  }

  openMovieid(id: string){
    this.openMovie.emit(id);
  }
  
  


}
