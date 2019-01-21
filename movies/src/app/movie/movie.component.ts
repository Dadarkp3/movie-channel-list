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
  selectGenre: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  openMovie: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  sendGenre(id: number){
    this.selectGenre.emit(id);
  }

  openMpvie(id: number){
    this.openMovie.emit(id);
  }
  
  


}
