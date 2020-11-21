import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  top_rated(lang,page,api_key) {
     return this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key='+api_key+'&language='+lang+'&page='+page);
  }
}
